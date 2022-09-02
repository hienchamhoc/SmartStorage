import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, DrawerLayoutAndroid, BackHandler, Alert, ActivityIndicator } from 'react-native';
import auth from "@react-native-firebase/auth";
import ToolbarAndroid from '@react-native-community/toolbar-android';
import { iconMenu } from '../containers/icon'
import { firebase } from '@react-native-firebase/database';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { StorageList } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    let [storageList, setStoragelist] = useState();

    const navigation = useNavigation();

    const drawer = useRef(null);

    const [isLoading, setIsloading] = useState(true);

    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => console.log('Signed out!'));
    };
    const handleBack = () => {
        // navigation.goBack();
        if (navigation.getState().index != 1) navigation.goBack();
        else { handleLogout() };
    }


    const navigationView = () => (
        <View>
            <Button
                title='Đăng xuất'
                onPress={handleLogout}
            />
        </View>
    );
    useEffect(() => {
        const backAction = () => {
            // console.log(navigation.getState().index);
            if (navigation.getState().index != 1) navigation.goBack();
            else {
                Alert.alert("Lưu ý!", "Bạn có chắc chắn muôn đăng xuất?", [
                    {
                        text: "Không",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Có", onPress: handleLogout }
                ]);
            };
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );


        return () => backHandler.remove();
    }, []);


    useEffect(() => {

        const reference = firebase
            .app()
            .database()
            .ref('/');
        reference
            .on('value', snapshot => {
                setStoragelist(snapshot.toJSON());
                // storageList = snapshot.toJSON();
                console.log('lay dl');
                // console.log(storageList);

            });


        setTimeout(() => {
            setIsloading(false)
        }, 1000);


    }, []);



    if (isLoading) return <ActivityIndicator size="large" />
    else
        return (
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition='right'
                renderNavigationView={navigationView}
            >
                <View style={styles.container}>
                    <ToolbarAndroid style={styles.toolBar}
                        title='Trang chủ'
                        actions={[{ icon: iconMenu, show: 'always' }]}
                        onActionSelected={() => drawer.current.openDrawer()}
                    />

                    <Text style={styles.storageList}>Danh sách kho</Text>
                    <StorageList keys={storageList} />





                </View>
            </DrawerLayoutAndroid>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff'

    },
    toolBar: {
        height: 56,
        backgroundColor: '#2E64FE'
    },
    storageList: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop: 25,

    },
});

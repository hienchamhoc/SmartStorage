import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export default function StorageList(props) {
    const isFirstRun = useRef(false);
    const navigation = useNavigation();
    const results = [];
    const storageList = props.keys


    const Item = (props) => {
        useEffect(() => {
            if (isFirstRun.current == true)
                navigation.navigate('Detail', { storage: [props.storageName, props.storageInfo] });
        }, [storageList])
        return (

            <View style={styles.storageElement}>
                {/* <Text>Danh sách kho</Text> */}
                <Text
                    style={styles.storageName}
                >{props.storageInfo.name}</Text>
                <View style={styles.storageDetail}>
                    <Button

                        title='Xem chi tiết'
                        onPress={() => {
                            navigation.navigate('Detail', { storage: [props.storageName, props.storageInfo] });
                            isFirstRun.current = true;
                        }}
                    />
                </View>
                <View style={styles.storageDelete}>
                    < Button
                        style={styles.storageDelete}
                        title='Xoá'


                    />
                </View>
            </View >
        );
    }



    Object.keys(storageList).map((indexStorage) => {

        // console.log(storageList[indexStorage]);
        results.push(

            <Item
                storageName={indexStorage}
                storageInfo={storageList[indexStorage]}
            />

        );

    })
    return results;
}

const styles = StyleSheet.create({
    storageElement: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#e6e6ff",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    storageName: {
        flex: 2,
        fontSize: 20,
    },
    storageDetail: {
        flex: 1.4,

    },
    storageDelete: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    }
});
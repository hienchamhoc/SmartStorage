import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ToolbarAndroid from "@react-native-community/toolbar-android";
// import { iconMenu } from "../containers/icon";
import { firebase } from '@react-native-firebase/database';

export default function DetailScreen({ navigate, route }) {
    const navigation = useNavigation();
    let storageInfo = route.params.storage[1];
    let storageName = route.params.storage[0];
    let nextStatus;
    const onOffAirConditioner = () => {
        if (storageInfo.air_conditioner_status == true) {
            nextStatus = false;
        } else {
            nextStatus = true;
        }
        console.log(storageName);
        const reference = firebase
            .app()
            .database()
            .ref('/' + storageName);
        reference
            .update({
                air_conditioner_status: nextStatus
            })
            .then(() => console.log('Data updated.'));
    }
    return (
        <View >
            <ToolbarAndroid style={styles.toolBar}
                title={storageInfo.name}

            />
            <View style={styles.container}>
                <View style={styles.air_conditioner_status} >
                    <Text style={styles.detailText} >Điều hoà: </Text>
                    <View style={styles.detailSwitch}>
                        <Switch
                            value={storageInfo.air_conditioner_status}
                            onValueChange={onOffAirConditioner}
                        />
                        <Text style={styles.detailText} >{storageInfo.air_conditioner_status ? 'Bật' : 'Tắt'}</Text>
                    </View>

                </View>
                <View style={styles.temperature}>
                    <Text style={styles.detailText}>Nhiệt độ: {storageInfo.temperature}°C</Text>

                </View>
                <View style={styles.humidity}>
                    <Text style={styles.detailText}>Độ ẩm: {storageInfo.humidity}%</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: '#fff',
        margin: 20,

    },
    toolBar: {
        height: 56,
        backgroundColor: '#2E64FE'
    },
    air_conditioner_status: {
        flexDirection: "row",

    },
    detailText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#000066",
    },
    detailSwitch: {
        flexDirection: "row",
    },
    temperature: {
        marginTop: 20,
    },
    humidity: {
        marginTop: 20,
    },
});
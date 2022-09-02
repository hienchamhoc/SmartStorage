import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { database, firebase } from "@react-native-firebase/database";

export default function LoginScreen() {
    const [wrong, setWrong] = useState(false);

    const navigation = useNavigation();
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");

    function onAuthStateChanged(user) {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if (!user) navigation.navigate('Login');
        if (user) navigation.navigate('Home');
    }, [user]);


    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, passWord)
            .then(() => {
                console.log('Signed in successfully!');
                setWrong(false);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                if (error.code === 'auth/wrong-password') {
                    console.log('Mật khẩu không chính xác hoặc không tồn tại');
                    setWrong(true);
                }

                console.error(error);
            });
    }



    return (
        <View style={styles.container}>
            <View style={styles.logoApp}>
                <Text style={styles.textInLogo}>Ứng dụng theo dõi nhà kho</Text>
            </View>
            <View style={styles.login}>
                <View style={styles.captionLogin}>
                    <Text>Đăng nhập để sử dụng dịch vụ</Text>
                </View>
                <View style={styles.accountLogin}>

                    <TextInput
                        placeholder="Tài khoản"
                        onChangeText={(e) => {
                            setEmail(e);
                        }}
                    />
                </View>
                <View style={styles.passwordLogin}>

                    <TextInput
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(e) => {
                            setPassWord(e);
                        }}
                    />
                </View>
                <View style={styles.buttonLogin}>
                    <Button
                        title="Đăng nhập"
                        onPress={handleLogin}
                    />

                </View>
                <View style={styles.buttonLogin}>
                    <Text>{wrong ? 'Tài khoản hoặc mật khẩu không chính xác' : null}</Text>

                </View>
                <View style={styles.changePassword}>
                    <Text>Đổi mật khẩu?</Text>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        backgroundColor: '#6666ff'

    },
    logoApp: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    textInLogo: {
        fontSize: 30,
    },
    login: {
        flex: 2,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50,
        backgroundColor: '#fff'

    },
    captionLogin: {
        flex: 1,
    },
    accountLogin: {
        flex: 1,
        textShadowOffset: { width: 10, height: 5 },

    },
    passwordLogin: {
        flex: 1,

    },
    buttonLogin: {
        flex: 1,
    },
    changePassword: {
        flex: 1,
    },
});

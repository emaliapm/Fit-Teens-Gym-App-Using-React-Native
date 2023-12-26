import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    ScrollView
} from "react-native";
import { Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const About = () => {
    const navigation = useNavigation();
    const { uname, pass } = useSelector((state) => state.login);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.aboutUs}>
                <View style={styles.container}>
                    <Text style={styles.p}>
                    Aplikasi ini dirancang untuk memenuhi Ujian Akhir Semester Mata Kuliah Pemrograman Mobile Informatika Telkom University Surabaya
                    </Text>
                    <Text style={styles.textWrapper}>Get to know us:</Text>
                    <Image style={styles.dina} source={require('../assets/dina.png')} />
                    <Image style={styles.ema} source={require('../assets/ema.png')} />
                    <Image style={styles.erica} source={require('../assets/erica.png')} />
                    <Image style={styles.elma} source={require('../assets/elma.png')} />
                </View>

                {/* <Button style={{ marginTop: 15 }} title="Clear Data" onPress={() => handleClearData()}></Button> */}
                <Button
                    style={{ marginTop: -60, marginBottom: 30 }}
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                >
                    <ButtonText>Logout</ButtonText>
                </Button>
            </View>
        </ScrollView>
      );
};

const styles = StyleSheet.create({
    aboutUs: {
        backgroundColor: '#0f0f0f',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    container: {
        backgroundColor: 'rgba(15, 16, 16, 1)',
        height: 1777,
        width: 393,
    },
    p: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        left: 37,
        letterSpacing: 0,
        lineHeight: 16,
        position: 'absolute',
        textAlign: 'center',
        top: 50,
        width: 320,
    },
    textWrapper: {
        color: '#FFE350',
        fontSize: 16,
        fontWeight: '500',
        left: 37,
        letterSpacing: 0,
        lineHeight: 16,
        position: 'absolute',
        textAlign: 'center',
        top: 150,
        width: 320,
    },
    dina: {
        height: 297,
        left: 52,
        position: 'absolute',
        top: 220,
        width: 289,
    },
    ema: {
        height: 308,
        left: 23,
        position: 'absolute',
        top: 575,
        width: 318,
    },
    erica: {
        height: 302,
        left: 52,
        position: 'absolute',
        top: 960,
        width: 289,
    },
    elma: {
        height: 304,
        left: 52,
        position: 'absolute',
        top: 1330,
        width: 289,
    },
});

export default About;
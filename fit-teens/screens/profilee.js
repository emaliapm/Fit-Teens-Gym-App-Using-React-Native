import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Linking
} from "react-native";
import { Button, ButtonText, Box } from '@gluestack-ui/themed';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Header } from "../components";
import { Input, HStack, Heading } from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";



const Profilee = () => {
    const navigation = useNavigation();
    const { nim, nama } = useSelector((state) => state.login);

    return (
        <>
            <Header title={"PROFILE"} />
            <View style={styles.container}>
                <Ionicons style={{alignSelf: "center", marginTop: 40}} name="person-circle" size={150} color="yellow" />
                <Heading mt={20} alignSelf="center" fontSize={30} color="yellow"> DETAIL PROFILE</Heading>
                <Box mt={20} w={"90%"} h={200} borderWidth={2} borderColor="yellow" alignSelf="center" borderRadius={10} >
                    <HStack mt={10} justifyContent="space-between">
                        <Text style={{ color: "white", marginTop: 12, marginLeft: 10, fontSize: 20 }}>Nama</Text>
                        <Input mx={15} w={"60%"} borderColor="yellow" h={30} style={styles.title}>
                            <Text style={{ color: "white", fontSize: 20, marginTop: 3, marginLeft: 10 }}>{nama}</Text>
                        </Input>
                    </HStack>
                    <HStack mt={10}>
                        <Text style={{ color: "white", marginTop: 12, marginLeft: 10, fontSize: 20 }}>Password</Text>
                        <Input w={"60%"} borderColor="yellow" h={30} style={styles.title}>
                            <Text style={{ color: "white", fontSize: 20, marginTop: 3, marginLeft: 10 }}>{nama}</Text>
                        </Input>
                    </HStack>

                    {/* <Button style={{ marginTop: 15 }} title="Clear Data" onPress={() => handleClearData()}></Button> */}
                    <Button alignSelf="center" w={"90%"} bg="yellow"
                         onPress={() => {
                            navigation.navigate("Login")
                        }}
                    >
                        <ButtonText bold color="black">Ubah Profile</ButtonText>
                    </Button>
                    <Text style={{ marginBottom: 5 }} onPress={() =>
                        Linking.openURL("https://www.freepik.com/icon/task-list_9329651#fromView=search&term=todo+list&page=1&position=1&track=ais").catch((err) => console.error("Error", err))
                    }>Splash Icon by Azland Studio (Freepik)</Text>
                    <Text style={{ marginBottom: 15 }} onPress={() =>
                        Linking.openURL("https://daudmuhajir.my.id").catch((err) => console.error("Error", err))
                    }>Developed by Daud Muhajir</Text>
                </Box>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "black"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
        marginLeft: 20,
        marginTop: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "blue",
    },
    content: {
        fontSize: 18,
        marginBottom: 20,
    }
});

export default Profilee;
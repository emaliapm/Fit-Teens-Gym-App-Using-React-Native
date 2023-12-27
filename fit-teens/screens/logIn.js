import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    // Button,
    Linking,
    TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack,
    Button,
    ButtonText,
    Input,
    InputField,
    InputSlot,
    FormControl,
    Heading
} from '@gluestack-ui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { setNama, setNim } from "../redux/profileSlice";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    // We use the useDispatch hook to dispatch actions to the store
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.login);
    const [tempNama, setTempNama] = useState('')
    const [tempNim, setTempNim] = useState('')

    const showToast = () => {
        toast.show({
            placement: "bottom left",
            render: ({ id }) => {
                return (
                    <Toast
                        nativeID={"toast-" + id}
                        action="error"
                        variant="accent"
                    >
                        <VStack space="xs">
                            <ToastTitle>Error</ToastTitle>
                            <ToastDescription>
                                Anda belum mengisi Nama atau NIM!
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            },
        })
    }

    return (
        <View style={styles.container}>
            <Heading style={styles.judul} >Log in to your account</Heading>
            <FormControl
                p="$4"
                borderRadius="$lg"
                borderColor="$borderLight300"
                sx={{
                    _dark: {
                        borderWidth: "$1",
                        borderRadius: "$lg",
                        borderColor: "$borderDark800",
                    },
                }}
            >
                <VStack space="4xl">
                    <Heading color="black" lineHeight="$md">
                        Profile {profile.nama} ({profile.nim})
                    </Heading>
                    <VStack space="sm">
                        <Text style={{color: "yellow"}} lineHeight="sm" sx={{ width: '100%' }}>
                            Username
                        </Text>
                        <Input variant="underlined" >
                            <InputField color="white" type="text" value={tempNama}
                                onChangeText={(text) => setTempNama(text)} />
                        </Input>
                    </VStack>
                    <VStack space="xs">
                        <Text style={{color: "yellow"}} lineHeight="$xs">
                            Password
                        </Text>
                        <Input variant="underlined">
                            <InputField color="white" type="password" value={tempNim}
                                onChangeText={(text) => setTempNim(text)} />
                        </Input>
                    </VStack>

                    <Button
                    
                        ml="auto"
                        onPress={() => {
                            if (tempNama === '' || tempNim === '') {
                                showToast();
                                return;
                            }
                            dispatch(setNama(tempNama));
                            dispatch(setNim(tempNim));
                            navigation.navigate("BottomNavigator");
                        }}
                        style={{width: "100%", backgroundColor: "yellow"}}
                    >
                        <ButtonText color="$black">Log in</ButtonText>
                    </Button>
                </VStack>
            </FormControl>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "black",
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
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
        padding: 20
    },
    judul: {
        color: "yellow",
        alignSelf: "center",
        fontSize: 25,

    },
});

export default LoginScreen;
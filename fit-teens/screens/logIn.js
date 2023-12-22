import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
    FormControl,
} from '@gluestack-ui/themed';
import { useDispatch } from 'react-redux';
import { setUname, setPass } from "../redux/loginSlice";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [tempUname, setTempUname] = useState('');
    const [tempPass, setTempPass] = useState('');
    const [isUnameInputFocused, setIsUnameInputFocused] = useState(false);
    const [isPassInputFocused, setIsPassInputFocused] = useState(false);

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
                                Anda belum mengisi data!
                            </ToastDescription>
                        </VStack>
                    </Toast>
                );
            },
        });
    }

    return (
        <View style={styles.container}>
            <VStack space="4xl">
                <VStack space="xs">
                    <Text style={{ ...styles.text, color: "#FFE350" }}>
                        Username
                    </Text>
                    <Input
                        onFocus={() => setIsUnameInputFocused(true)}
                        onBlur={() => setIsUnameInputFocused(false)}
                        style={{ ...styles.textInput, borderBottomColor: isUnameInputFocused ? "#808080" : "$#C0C0C0" }}
                    >
                        <InputField
                            type="text"
                            value={tempUname}
                            onChangeText={(text) => setTempUname(text)}
                            style={{ ...styles.textInput, color: "#FFE350" }}
                        />
                    </Input>
                </VStack>
                <VStack space="xs">
                    <Text style={{ ...styles.text, color: "#FFE350" }}>
                        Password
                    </Text>
                    <Input
                        onFocus={() => setIsPassInputFocused(true)}
                        onBlur={() => setIsPassInputFocused(false)}
                        style={{ ...styles.textInput, borderBottomColor: isPassInputFocused ? "#808080" : "$#C0C0C0" }}
                    >
                        <InputField
                            type="text"
                            value={tempPass}
                            onChangeText={(text) => setTempPass(text)}
                            style={{ ...styles.textInput, color: "#FFE350" }}
                        />
                    </Input>
                </VStack>

                <Button
                    ml="auto"
                    onPress={() => {
                        if ( tempUname === '' || tempPass === '') {
                            showToast();
                            return;
                        }
                        dispatch(setUname(tempUname));
                        dispatch(setPass(tempPass));
                        navigation.navigate("BottomNavigator");
                    }}
                    style={{ backgroundColor: "#808080" }}
                >
                    <ButtonText style={{ color: "#FFE350", justifyContent: 'center', alignContent: 'center', flex: 1, textAlign: 'center' }}>Log in</ButtonText>
                </Button>
            </VStack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    text: {
        width: '100%',
    },
    textInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
    },
});

export default LoginScreen;
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, useToast, Toast, ToastTitle, ToastDescription, VStack } from "@gluestack-ui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteActivity, fetchActivity, storeActivity, updateActivity } from "../redux/jadwalSlice";
import * as Font from 'expo-font'; // Import library for font loading

const Jadwal = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const dispatch = useDispatch();
    const [aktivitas, setAktivitas] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const { uname, pass } = useSelector((state) => state.login);
    const { data: activities, loading } = useSelector((state) => state.jadwal); // Accessing the data from the Redux state

    useEffect(() => {
        if (uname === '') {
            navigation.navigate("Login");
        }
        dispatch(fetchActivity({ uname, isComplete: "0" }))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [uname]);

    useEffect(() => {
        dispatch(fetchActivity({ uname, isComplete: "1" }));
    }, []);

    const showToast = () => {
        toast.show({
            placement: "top",
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
                                Anda belum mengisi aktivitas!
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            },
        })
    }

    const handleAddActivity = async () => {
        if (aktivitas === '') {
            showToast();
            return;
        }

        try {
            if (editIndex !== -1) {
                dispatch(updateActivity({ id: editIndex, title: aktivitas, uname, isComplete: false, completed: false }));
            } else {
                dispatch(storeActivity({ uname, title: aktivitas, isComplete: false, completed: false }));
            }
            setAktivitas("");
        } catch (e) {
            console.log('Error add activity: in jadwal.js');
            console.error(e.message);
        }
    };

    const handleDeleteActivity = async (item, index) => {
        dispatch(deleteActivity({ uname, id: item.id, completed: false }));
    };

    const handleStatusChange = async (item, index) => {
        dispatch(updateActivity({ id: item.id, title: item.title, uname, isComplete: true, completed: false }));
    };

    const handleEditActivity = (item, index) => {
        setAktivitas(item.title);
        setEditIndex(item.id);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.activity}>
            <Divider my={5} h={4} />
            <Text style={styles.itemList}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleEditActivity(item, index)}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteActivity(item, index)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleStatusChange(item, index)}>
                    <Text style={styles.statusButton}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.jadwal}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tambah Aktivitas"
                        value={aktivitas}
                        onChangeText={(text) => setAktivitas(text)}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
                    <Text style={styles.addButtonText}>
                        {editIndex !== -1 ? "Update Aktivitas" : "Add Aktivitas"}
                    </Text>
                </TouchableOpacity>
                <FlatList
                    data={activities} // Menggunakan data dari Redux state
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    jadwal: {
        backgroundColor: "#0f0f0f",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    container: {
        backgroundColor: "#0f0f0f",
        height: 853,
        position: "relative",
        width: 390,
    },
    inputContainer: {
        borderColor: "#FFE350",
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    input: {
        color: "#FFF",
        flex: 1,
    },
    addButton: {
        backgroundColor: "#338FB7",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    activity: {
        marginVertical: 10,
    },
    itemList: {
        color: "#FFE350",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: "#87B87E",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
    },
    deleteButton: {
        backgroundColor: "#B73333",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
    },
    statusButton: {
        backgroundColor: "#338FB7",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Jadwal;

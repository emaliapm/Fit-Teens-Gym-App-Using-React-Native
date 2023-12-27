import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import {
    Divider,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    VStack,
    HStack,
    Button
} from "@gluestack-ui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteTask, fetchActivitys, storeTask, updateTask } from "../redux/taskSlice";

const TaskScreen = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const { nim, nama } = useSelector((state) => state.login);
    const { data } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const { uname, nama } = useSelector((state) => state.profile);
    const { data, loading } = useSelector((state) => state.task);
    const [task, setTask] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uname === '') {
            navigation.navigate("Profile");
        }
        dispatch(fetchActivitys({ uname, isComplete: "0" }));
    }, [uname]);

    const showToast = () => {
        toast.show({
            placement: "top",
            render: ({ id }) => {
                return (
                    <Toast nativeID={"toast-" + id} action="error" variant="accent">
                        <VStack space="xs">
                            <ToastTitle>Error</ToastTitle>
                            <ToastDescription>
                                Anda belum mengisi Task!
                            </ToastDescription>
                        </VStack>
                    </Toast>
                );
            },
        });
    };

    const handleAddTask = async () => {
        // alert if task empty
        if (task === "") {
            showToast();
            return;
        }

        try {
            if (editIndex !== -1) {
                // Edit existing task 
                dispatch(updateTask({ id: editIndex, title: task, uname, isComplete: false, completed: false }));
            } else {
                // Add new task 
                dispatch(storeTask({ uname, title: task, isComplete: false, completed: false }));
            }
            setTask("");
        } catch (e) {
            console.log("Error add task: in task-all.js");
            console.error(e.message);
        }
    };

    const handleDeleteTask = async (item, index) => {
        dispatch(deleteTask({ uname, id: item.id, completed: false }));
    };

    const handleStatusChange = async (item, index) => {
        dispatch(updateTask({ id: item.id, title: item.title, uname, isComplete: true, completed: false }));
    };

    const handleEditTask = (item, index) => {
        setTask(item.title);
        setEditIndex(item.id);
    };

    useEffect(() => {
        dispatch(fetchTasks({ nim, isComplete: "1" }));
    }, []);

    const handleRefresh = () => {
        dispatch(fetchTasks({ nim, isComplete: "0" }));
        dispatch(fetchTasks({ nim, isComplete: "1" }));
    };

    const renderItem = ({ item, index, completed = false }) => (
        <View style={styles.task}>
            <VStack mt={10}>
                <HStack justifyContent="space-between" mx={20}>
                    <Text style={styles.itemList}>{item.title}</Text>
                    <View style={styles.taskButtons}>
                        <TouchableOpacity onPress={() => handleEditTask(item, index)}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTask(item, index)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleStatusChange(item, index, completed)}
                        >
                            <Text style={styles.statusButton}>
                                {completed ? "Undone" : "Done"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </HStack>
            </VStack>
        </View>
    );


    return (
        <>
        <Header title={"ALL TASK"} />
            <View style={styles.container}>
                <Text style={styles.heading}>Jadwal Aktivitas </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukan Aktivitas"
                    value={task}
                    onChangeText={(text) => setTask(text)}
                    placeholderTextColor={"yellow"}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.addButtonText}>
                        {editIndex !== -1 ? "Update Task" : "Add Task"}
                    </Text>
                </TouchableOpacity>
                <Button mt={10} title="Refresh" onPress={handleRefresh}>
                    <Text style={{color: "white", fontSize: 20}}>Refresh</Text>
                </Button>
                <Text style={{ color: "yellow", marginTop: 20, fontSize: 18 }}>
                    Aktivitas
                </Text>
                <View style={styles.taskview}>
                    <FlatList
                        data={data.filter(task => !task.isComplete)}
                        renderItem={(props) => renderItem({ ...props, completed: false })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <Text style={{ color: "yellow", marginTop: 20, fontSize: 18 }}>
                    Riwayat
                </Text>
                <View style={styles.taskview}>
                    <FlatList
                        data={data.filter(task => task.isComplete)}
                        renderItem={(props) => renderItem({ ...props, completed: true })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {loading && (
                    <ActivityIndicator size="large" color="yellow" style={styles.loader} />
                )}
            </View>
        </>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "black",
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
        color: "yellow",
        alignSelf: "center",
        marginTop: 30,
    },
    input: {
        borderWidth: 2,
        borderColor: "#ccc",
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        fontSize: 18,
        height: 40,
        borderColor: "yellow",
        color: "white"
    },
    addButton: {
        backgroundColor: "yellow",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,

    },
    task: {
        marginBottom: 15,
        fontSize: 18,
        borderRadius: 10,
    },
    taskview: {
        borderWidth: 2,
        borderColor: "yellow",
        borderRadius: 10
    },
    itemList: {
        fontSize: 19,
        alignItems: "flex-start",
        color: "yellow"
    },
    itemBorder: {
        borderWidth: 0.5,
        borderColor: "#cccccc",
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
    statusButton: {
        marginLeft: 10,
        color: "blue",
        fontWeight: "bold",
        fontSize: 18,
    },
    loader: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "black",
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white"
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "yellow",
        borderRadius: 5,
    },
    modalCloseButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
});


export default TaskScreen;
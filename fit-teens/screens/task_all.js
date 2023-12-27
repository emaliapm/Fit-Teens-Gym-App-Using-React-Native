import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
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
    Button,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@gluestack-ui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    deleteTask,
    fetchTasks,
    storeTask,
    updateTask,
} from "../redux/taskSlice";
import { Header } from "../components";

const TaskScreen = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const { nim, nama } = useSelector((state) => state.login);
    const { data } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchTasksByCompletion = (isComplete) => {
        setLoading(true);

        dispatch(fetchTasks({ nim, isComplete }))
            .then(() => {
                // Successfully fetched tasks
            })
            .catch((error) => {
                console.error(`Error fetching tasks with isComplete=${isComplete}:`, error);
                showToastError("Failed to fetch tasks.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTasksByCompletion("0");
    }, [dispatch, nim]);


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
                dispatch(
                    updateTask({
                        id: editIndex,
                        title: task,
                        nim,
                        isComplete: false,
                        completed: false,
                    })
                );
                setEditIndex(-1); // Reset editIndex after editing task
            } else {
                // Add new task
                dispatch(
                    storeTask({
                        nim,
                        title: task,
                        isComplete: false,
                        completed: false,
                    })
                );
            }
            setTask("");
        } catch (e) {
            console.log("Error add task: in task-all.js");
            console.error(e.message);
        }
    };

    const handleDeleteTask = (item, index, completed = false) => {
        setLoading(true);

        // Ensure that you are using the dispatch function inside the component
        dispatch(deleteTask({ nim, id: item.id, completed }))
            .then(() => dispatch(fetchTasks({ nim, isComplete: "1" })))
            .then(() => {
                // Successfully refetched tasks after deletion
                console.log('Updated Redux state:', useSelector(state => state.task.data));
            })
            
            .finally(() => {
                setLoading(false);
            });
    };

    const handleStatusChange = (item, index, completed = false) => {
        setLoading(true);

        dispatch(updateTask({
            id: item.id,
            title: item.title,
            nim,
            isComplete: !completed,
            completed,
        }))
            .then(() => {
                // Successfully updated task
                console.log('Updated Redux state:', useSelector(state => state.task.data));
            })
            .catch((error) => {
                console.log('Error updating task:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleEditTask = (item, index) => {
        setTask(item.title);
        setEditIndex(item.id);
    };

    const handleTaskPress = () => {
        setLoading(true);

        dispatch(fetchTasks({ nim, isComplete: "1" }))
            .then(() => {
                // Fetching complete tasks succeeded
                setModalVisible(true);
            })
            .catch((error) => {
                // Fetching complete tasks failed
                console.error("Error fetching complete tasks:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const closeModal = () => {
        setLoading(true);

        dispatch(fetchTasks({ nim, isComplete: "0" }))
            .then(() => {
                // Fetching incomplete tasks succeeded
                setModalVisible(false);
            })
            .catch((error) => {
                // Fetching incomplete tasks failed
                console.error("Error fetching incomplete tasks:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        console.log("Completed tasks:", data.filter((task) => task.isComplete));
        dispatch(fetchTasks({ nim, isComplete: "1" }));
    }, [editIndex]); // Ensure this dependency is correct

    useEffect(() => {
        console.log("Modal visibility:", isModalVisible);
        dispatch(fetchTasks({ nim, isComplete: "1" }));
    }, [isModalVisible]);

    const handleRefresh = () => {
        setLoading(true);

        Promise.all([
            dispatch(fetchTasks({ nim, isComplete: "0" })),
            dispatch(fetchTasks({ nim, isComplete: "1" })),
        ])
            .then(() => {
                // Successfully fetched both incomplete and complete tasks
            })
            .catch((error) => {
                console.error('Error refreshing tasks:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const renderMainItem = ({ item, index, completed = false }) => (
        <TouchableOpacity onPress={() => handleTaskPress(item)}>
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
        </TouchableOpacity>
    );

    // For the history modal
    const renderHistoryItem = ({ item, index, completed = false }) => (
        <TouchableOpacity onPress={() => handleTaskPress(item)}>
            <View style={styles.task}>
                <VStack mt={10}>
                    <HStack justifyContent="space-between" mx={20}>
                        <Text style={styles.itemList}>{item.title}</Text>
                        <View style={styles.taskButtons}>
                            <TouchableOpacity onPress={() => handleDeleteTask(item, index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </HStack>
                </VStack>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Header title={"JADWAL"} />
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
                    <Text style={{ color: "white", fontSize: 20 }}>Refresh</Text>
                </Button>
                <Text style={{ color: "yellow", marginTop: 20, fontSize: 18 }}>
                    Aktivitas
                </Text>
                <View style={styles.taskview}>
                    <FlatList
                        data={data.filter((task) => !task.isComplete)}
                        renderItem={renderMainItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        console.log("Show History Modal button pressed");
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.addButtonText}>Show History Modal</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>History Tasks</Text>
                            <FlatList
                                data={data.filter((task) => task.isComplete)}
                                renderItem={renderHistoryItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={closeModal}
                            >
                                <Text style={styles.modalCloseButtonText}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider, useToast, Toast, ToastTitle, ToastDescription, VStack } from "@gluestack-ui/themed";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteTask, fetchTasks, storeTask, updateTask } from "../redux/taskSlice";
import * as Font from 'expo-font'; // Import library for font loading

const Jadwal = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [task, setTask] = useState(""); // Declare state for the task
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(-1); // Declare state for the editIndex
    const dispatch = useDispatch();
    const { uname, pass } = useSelector((state) => state.login);
    const [loading, setLoading] = useState(true); // Declare state for loading

    useEffect(() => {
        if (uname === '') {
            navigation.navigate("Login");
        }
        dispatch(fetchTasks({ uname, isComplete: "0" }))
          .then(() => setLoading(false)) // Set loading to false when data is loaded
          .catch(() => setLoading(false)); // Set loading to false in case of an error
    }, [uname]);

    useEffect(() => {
        dispatch(fetchTasks({ uname, isComplete: "1" }));
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
        // alert if task empty
        if (task === '') {
            showToast();
            return;
        }

        try {
            if (editIndex !== -1) {
                // Edit existing task 
                dispatch(updateActivity({ id: editIndex, title: activity, uname, isComplete: false, completed: false }));
            } else {
                // Add new task 
                dispatch(store({ uname, title: acitivty, isComplete: false, completed: false }));
            }
            setTask("");
        } catch (e) {
            console.log('Error add activity: in jadwal.js');
            console.error(e.message);
        }
    };

    const handleDeleteActivity = async (item, index) => {
        dispatch(deleteActivity({ uname, id: item.id, completed: false }));
    };

    const handleStatusChange = async (item, index) => {
        dispatch(updateTask({ id: item.id, title: item.title, uname, isComplete: true, completed: false }));
    };

    const handleEditTask = (item, index) => {
        setTask(item.title);
        setEditIndex(item.id);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.acitivty}>
            <Divider my={5} h={4} />
            <Text
                style={styles.itemList}>{item.title}</Text>
            <View
                style={styles.taskButtons}>

                <TouchableOpacity
                    onPress={() => handleEditTask(item, index)}>
                    <Text
                        style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDeleteTask(item, index)}>
                    <Text
                        style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleStatusChange(item, index)}>
                    <Text
                        style={styles.statusButton}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.jadwal}>
        <View style={styles.div}>
            <View style={styles.overlap}>
            <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddActivity}>
                <Text style={styles.addButtonText}>
                    {editIndex !== -1 ? "Update Task" : "Add Task"}
                </Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.overlapGroup}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <View key={index} style={styles.textWrapperContainer}>
                        <Text style={styles.textWrapper}>(Aktivitas $ {index})</Text>
                    </View>
                ))}
                <View style={styles.buttonContainer}>
                    {[
                        { text: 'Edit', style: styles.editButton },
                        { text: 'Hapus', style: styles.deleteButton },
                        { text: 'Selesai', style: styles.completeButton }
                    ].map((button, index) => (
                        <View key={index} style={styles.buttonWrapper}>
                            <TouchableOpacity style={button.style}>
                                <Text style={styles.buttonText}>{button.text}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.overlap4}>
            <Text style={styles.textWrapper}>Tambah Aktivitas</Text>
            </View>
            <Text style={styles.textWrapper}>Aktivitas</Text>
            <View style={styles.overlap5}>
            {[1, 2, 3, 4, 5].map((index) => (
                <View key={index} style={styles.textWrapperContainer}>
                <Text style={styles.textWrapper}>(Aktivitas ${index})</Text>
                </View>
            ))}
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>
            {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} style={styles.deleteButton}>
                <Text style={styles.textWrapper}>Hapus</Text>
                </TouchableOpacity>
            ))}
            </View>
            <Text style={styles.textWrapper}>Riwayat</Text>
            <Text style={styles.textWrapper}>Jadwal Aktivitas</Text>
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
  div: {
    backgroundColor: "#0f0f0f",
    height: 853,
    position: "relative",
    width: 390,
  },
  overlap: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 27,
    left: 23,
    position: "absolute",
    top: 148,
    width: 344,
  },
  textWrapper: {
    color: "#FFE350",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 21.7,
    whiteSpace: "nowrap",
  },
  overlapGroup: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 212,
    left: 23,
    position: "absolute",
    top: 263,
    width: 344,
  },
  textWrapperContainer: {
    position: "absolute",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#FFE350",
    position: "absolute",
    width: 321,
  },
//   editButton: {
//     backgroundColor: "#87B87E",
//     borderRadius: 4,
//     height: 19,
//     position: "absolute",
//     width: 44,
//   },
//   deleteButton: {
//     backgroundColor: "#B73333",
//     borderRadius: 4,
//     height: 19,
//     position: "absolute",
//     width: 44,
//   },
//   completeButton: {
//     backgroundColor: "#338FB7",
//     borderRadius: 4,
//     height: 19,
//     position: "absolute",
//     width: 44,
//   },
overlap4: {
    backgroundColor: "#FFE350",
    borderRadius: 5,
    height: 27,
    left: 23,
    position: "absolute",
    top: 185,
    width: 344,
},
overlap5: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 212,
    left: 22,
    position: "absolute",
    top: 525,
    width: 344,
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10, // You can adjust the margin as needed
},
buttonText: {
    color: "#FFF", // Adjust the color as needed
    fontSize: 12, // Adjust the font size as needed
    fontWeight: "bold", // Adjust the font weight as needed
},
buttonWrapper: {
    marginVertical: 5, // Adjust the vertical margin as needed
},


});

export default Jadwal;
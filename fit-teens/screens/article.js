import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from '../components';

const windowWidth = Dimensions.get('window').width;
const ArticleScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { uname, pass } = useSelector((state) => state.login);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = () => {
        fetch('https://raw.githubusercontent.com/emaliapm/Fit-Teens-Gym-App-Using-React-Native/master/fit-teens/article.json')
            .then((response) => response.json())
            .then((json) => {
                setData(json.articles);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const DetailArticle = (item) => {
        navigation.navigate('DetailArticle', { data: item })
    }

    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity style={styles.item} onPress={() => DetailArticle(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.itemText}>{item.title}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.itemBorder}></View>
            </>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    } else {
        return (
            <>
                <Header title={"ARTICLE"} />
                <View style={{ flex: 1, backgroundColor: "black", }}>
                    <StatusBar style="auto" />
                    <FlatList style={{ backgroundColor: "black" }} data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
                </View>
            </>
        );
    }
};

// ...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        padding: 20,
        backgroundColor: 'black',
    },
    itemBorder: {
        borderWidth: 0.5,
        borderColor: '#cccccc',
    },
    itemImage: {
        width: 100,
        height: 80,
    },
    itemText: {
        fontSize: 15,
        width: windowWidth - 150,
        marginLeft: 15,
        color: "white",
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 15,
        color: 'yellow', // Warna teks diubah menjadi kuning
        marginLeft: 15,
    },
});
// ...


export default ArticleScreen;
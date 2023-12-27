import { Text, ScrollView, Image, Button, View, Heading } from "@gluestack-ui/themed";
import { StyleSheet, Linking } from "react-native";
import { Header } from "../components";

const DetailArticle = ({ route }) => {
    const { data } = route.params;
    return (
        <>
        <Header title={"DETAIL ARTICLE"} withBack></Header>
            <ScrollView style={{backgroundColor: "black"}}>
                <View>
                    <Image style={{ width: "90%", alignSelf: "center", marginTop: 50, height: 300 }} source={{ uri: data.image }} />
                    <Heading  textAlign="center" mx={25} alignSelf="center" mt={20} color="white">{data.title}</Heading>
                    <Text color="white" mt={10} alignSelf="center" bold>{data.date}</Text>
                    <Text color="white" mt={10} mx={20} textAlign="justify">{data.content}</Text>
                    <Button bg="red" alignSelf="center" w={"90%"} onPress={() => Linking.openURL(data.link).catch((err) => console.error("Error", err))}>
                        <Text bold color="white">Read More</Text>
                    </Button>
                </View>

            </ScrollView>
        </>
    )
}

export default DetailArticle
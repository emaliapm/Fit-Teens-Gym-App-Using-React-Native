import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Image, Heading } from '@gluestack-ui/themed';
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ route, title, withBack = false, cart = [] }) => {
    const navigation = useNavigation();

    const navigateToCart = () => {
        navigation.navigate('Cart', { cart });
    };

    return (
        <SafeAreaView>
          <StatusBar barStyle="light" backgroundColor={"black"} />
          <Box bg={"black"} p={"4"} h={50}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center">
                {!withBack ? (
                  <>
                    <Image
                      source={require("../assets/task-list.png")}
                      w="12"
                      h="12"
                      alt="Fisheesh Logo"
                      mr={"3"}
                    />
                  </>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Box mr={"3"}>
                      <Ionicons name="arrow-back-outline" size={32} color="white" />
                    </Box>
                  </TouchableOpacity>
                )}
                <Heading bold ml={20} my={10} color={"yellow"}>{title}</Heading>
              </HStack>
            </HStack>
          </Box>
        </SafeAreaView>
      );
    };
    
    export default Header;
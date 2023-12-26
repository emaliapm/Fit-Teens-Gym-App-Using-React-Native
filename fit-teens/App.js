import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"
import { AboutScreen, LoginScreen, TaskCompletedScreen, ArticleScreen, JadwalScreen } from './screens';
import { store } from './redux/store';
import { Provider } from 'react-redux';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Article') {
            iconName = 'tasks';
          } else if (route.name === 'Jadwal') {
            iconName = 'clipboard-check';
          } else if (route.name === 'About') {
            iconName = 'exclamation-circle';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={focused ? 'navy' : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text style={{ marginBottom: 10, color: focused ? 'navy' : color }}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Article"
        component={ArticleScreen}
        options={{  unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Jadwal"
        component={JadwalScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator>
            
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
              options={{ 
                headerShown: false,
                headerStyle : {
                backgroundColor: 'black',
                },
               
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="DetailArticle" component={DetailArticle} options={{ headerTitle: 'Detail Berita', 
          headerStyle:{
            backgroundColor: 'black',
          }, headerTitleStyle: {
            color: 'yellow'
          }}} />

          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App;
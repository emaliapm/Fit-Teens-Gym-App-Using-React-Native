import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"
<<<<<<< HEAD
import { AboutScreen, ArticleScreen, LoginScreen, ProfileScreen, TaskCompletedScreen, TaskScreen } from './screens';
=======
import { AboutScreen, LoginScreen, TaskCompletedScreen, ArticleScreen, JadwalScreen } from './screens';
>>>>>>> 1e0977c035f93e53a24d79eec69af2a933c0bb85
import { store } from './redux/store';
import { Provider } from 'react-redux';
import DetailArticle from './screens/DetailArticle';
import Profilee from './screens/profilee';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const noHead = { headerShown: false };

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Article') {
            iconName = 'tasks';
<<<<<<< HEAD
          }
          else if (route.name === 'Article') {
            iconName = 'newspaper';
=======
          } else if (route.name === 'Jadwal') {
            iconName = 'clipboard-check';
>>>>>>> 1e0977c035f93e53a24d79eec69af2a933c0bb85
          } else if (route.name === 'About') {
            iconName = 'exclamation-circle';
          }
          else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={focused ? 'yellow' : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text style={{ marginBottom: 10, color: focused ? 'yellow' : color }}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: "black"
        },
      })}
    >
      <Tab.Screen
<<<<<<< HEAD
        name="Task"
        component={TaskScreen}
        options={noHead}
      />
      <Tab.Screen
        name="Article"
        component={ArticleScreen}
        options={noHead}
=======
        name="Article"
        component={ArticleScreen}
        options={{  unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Jadwal"
        component={JadwalScreen}
        options={{ unmountOnBlur: true }}
>>>>>>> 1e0977c035f93e53a24d79eec69af2a933c0bb85
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={noHead}
      />
      <Tab.Screen
        name="Profile"
        component={Profilee}
        options={noHead}
      />

    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
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
<<<<<<< HEAD
            <Stack.Screen
              name="DetailArticle"
              component={DetailArticle}
              options={{ headerShown: false }}
            />
=======
            <Stack.Screen name="DetailArticle" component={DetailArticle} options={{ headerTitle: 'Detail Berita', 
          headerStyle:{
            backgroundColor: 'black',
          }, headerTitleStyle: {
            color: 'yellow'
          }}} />
>>>>>>> 1e0977c035f93e53a24d79eec69af2a933c0bb85

          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
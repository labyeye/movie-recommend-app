import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Home1 from "./src/screens/Home1/Home1";
import Home2 from "./src/screens/Home2/Home2";
import Home3 from "./src/screens/Home3/Home3";
import Login from "./src/screens/Login/Login";
import Signup from "./src/screens/SignUp/Signup";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import CustomerDashboard from "./src/screens/CustomerDashboard/CustomerDashboard";
import CustomerChat from "./src/screens/CustomerChat/CustomerChat";
import CustomerProfile from "./src/screens/CustomerProfile/CustomerProfile";
import CustomerWallet from "./src/screens/CustomerWallet/CustomerWallet";
import { Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? require("./assets/icons/home-focused.png")
              : require("./assets/icons/home.png");
          } else if (route.name === "Messages") {
            iconName = focused
              ? require("./assets/icons/mail-focused.png")
              : require("./assets/icons/mail.png");
          } else if (route.name === "Profile") {
            iconName = focused
              ? require("./assets/icons/profile-focused.png")
              : require("./assets/icons/profile.png");
          } else if (route.name === "Settings") {
            iconName = focused
              ? require("./assets/icons/settings-focused.png")
              : require("./assets/icons/settings.png");
          } else if (route.name === "Wallet") {
            iconName = focused
              ? require("./assets/icons/wallet-focused.png")
              : require("./assets/icons/wallet.png");
          }

          return (
            <Image
              source={iconName}
              style={{
                marginTop: Platform.OS === "ios" ? 25 : 0,
                width: 30,
                height: 30,
                alignSelf: "center",
                justifyContent: "center",
              }}
            />
          );
        },
        tabBarActiveTintColor: "#4bf986",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderTopColor: "transparent",
          borderRadius: 30,
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={CustomerDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={CustomerChat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={CustomerProfile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={CustomerDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Wallet"
        component={CustomerWallet}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (navigationRef.current) {
        if (token) {
          // If token exists, navigate to Dashboard
          navigationRef.current.navigate('Dashboard');
        } else {
          // Otherwise, navigate to Login
          navigationRef.current.navigate('Login');
        }
      }
    };

    const unsubscribe = navigationRef.current?.addListener('ready', () => {
      checkLoggedIn();
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home1"
            component={Home1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home2"
            component={Home2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home3"
            component={Home3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

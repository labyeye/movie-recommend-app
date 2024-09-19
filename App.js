import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Home1 from "./src/screens/Home1/Home1";
import Home2 from "./src/screens/Home2/Home2";
import Home3 from "./src/screens/Home3/Home3";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

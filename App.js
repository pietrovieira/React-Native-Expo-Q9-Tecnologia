import React from "react";

/***
 * Views
 */
import LoginView from "./views/LoginView";
import CreateView from "./views/CreateView";
/***
 * 
 */

 import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
console.disableYellowBox = true;
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Create" component={CreateView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

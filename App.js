import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./Home";
import Detalhes from "./Detalhes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Eventos" }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: "Detalhes do Evento" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




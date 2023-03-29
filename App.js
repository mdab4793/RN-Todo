import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./components/BottomTabs";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import Splash from "./components/Splash";
// 앱이 각 화면이 전환될 수 있는 기본 틀.
const Stack = createStackNavigator();

export default function App() {
  //로딩여부
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  if (isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <BottomTabs />
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todo: { flex: 1, justifyContent: "center", alignItems: "center" },
});

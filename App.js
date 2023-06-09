import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./components/BottomTabs";
import HomeScreen from "./components/HomeScreen";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import Register from "./components/Register";
import { Provider } from "react-redux";
import MyPage from "./components/MyPage";
import store from "./store";

// 앱이 각 화면이 전환될 수 있는 기본 틀.
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todo: { flex: 1, justifyContent: "center", alignItems: "center" },
});

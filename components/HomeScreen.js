import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import { useState } from "react";
import TodoList from "./TodoList";
import BottomTabs from "./BottomTabs";

const Stack = createStackNavigator();

const HomeScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  //로그인 안됐을때 로그인요청화면
  if (loggedIn == false) {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
    //로그인이 됐을떄 투두리스트 화면
  } else {
    return (
      <View style={styles.container}>
        <TodoList />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;

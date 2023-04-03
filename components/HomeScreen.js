import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";

import Splash from "./Splash";
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

const HomeScreen = () => {
  const dispatch = useDispatch();
  //useSelector((state) => state)이렇게만쓰면 모든 state가져옴
  //useSelector((state) => state.authSlice) state뒤에 .붙이면 뒤에붙은것가져옴
  const authToken = useSelector((state) => state.authSlice);
  console.log(authToken.accessToken);
  const [token, setToken] = useState(null);

  // 로딩 여부
  const [isLoading, setIsLoading] = useState(true);
  //splash screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  if (isLoading) {
    return <Splash />;
    //login false면 로그인화면
  }
  if (authToken == null) {
    return (
      <View style={styles.container}>
        <TodoList />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Login />
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

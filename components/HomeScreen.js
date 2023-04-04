import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";

import Splash from "./Splash";
import { useDispatch, useSelector } from "react-redux";
import BottomTabs from "./BottomTabs";

const Stack = createStackNavigator();

const HomeScreen = () => {
  const dispatch = useDispatch();

  //useSelector((state) => state)이렇게만쓰면 모든 state가져옴
  //useSelector((state) => state.authSlice) state뒤에 .붙이면 뒤에붙은것가져옴
  const authToken = useSelector((state) => state.authSlice);
  console.log(authToken.accessToken);

  const isLoggedIn = useSelector(
    (state) => state.authSlice.accessToken == null
  );
  // 로딩 여부
  const [isLoading, setIsLoading] = useState(true);
  //splash screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  if (isLoading) {
    return <Splash />;
  } else if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <BottomTabs />
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

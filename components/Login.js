import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../store";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "http://15.164.230.202:3011/auth/login",
        { email, password }
      );

      const accessToken = response.data.result.access_token;
      await AsyncStorage.setItem("accessToken", accessToken);
      navigation.navigate("BottomTabs");
      alert("로그인 성공!");
      console.log(accessToken); // 토큰 값이 출력됩니다.
      // 토큰이 저장되면 TodoList 화면으로 이동하도록 navigation 설정
      dispatch(
        loginSuccess({ token: accessToken, username: response.data.username })
      );
    } catch (error) {
      console.log(error);
      alert("로그인 실패!");
      dispatch(loginFail(error.message));
      // setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    // .catch((error) => {
    //   alert("로그인 실패!");
    //   dispatch(loginFail(error.message));
    //   console.log(error);
    // });
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://15.164.230.202:3011/auth/login",
  //       { email, password }
  //     );
  //     const accessToken = response.data.result.access_token;
  //     await AsyncStorage.setItem("accessToken", accessToken);
  //     navigation.navigate("TodoList");
  //     alert("로그인 성공!");
  //   } catch (error) {
  //     console.log(error);
  //     alert("로그인 실패!");
  //     setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
  //   }
  // };

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>로그인</Text>
  //       <TextInput
  //         style={styles.loginInput}
  //         placeholder="이메일"
  //         onChangeText={(text) => setEmail(text)}
  //         value={email}
  //       />
  //       <TextInput
  //         style={styles.passwordInput}
  //         type="password"
  //         placeholder="비밀번호"
  //         onChangeText={(text) => password(text)}
  //         value={password}
  //         secureTextEntry={true}
  //       />
  //       <Button title="로그인" onPress={handleLogin} />

  //       <Button
  //         title="회원가입"
  //         onPress={() => navigation.navigate("Register")}
  //       />
  //       {errorMessage ? (
  //         <Text style={styles.errorMessage}>{errorMessage}</Text>
  //       ) : null}
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="이메일"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.passwordInput}
        type="password"
        placeholder="비밀번호"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="로그인" onPress={handleLogin} />

      <Button
        title="회원가입"
        onPress={() => navigation.navigate("Register")}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    fontSize: 18,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    fontSize: 18,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Login;

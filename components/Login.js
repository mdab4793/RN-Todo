import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../store";

const apiUrl = process.env.API_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(`${apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (response.data.isValid) {
            dispatch(
              loginSuccess({
                token: accessToken,
                username: response.data.username,
              })
            );
            navigation.navigate("BottomTabs");
          }
        } catch (error) {
          console.log(error);
          alert("자동로그인 실패!");
          // accessToken이 유효하지 않다면 로그인 화면을 표시합니다.
        }
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      const accessToken = response.data.result.access_token;
      await AsyncStorage.setItem("accessToken", accessToken);
      alert("로그인 성공!");
      console.log(accessToken); // 토큰 값이 출력됩니다.

      dispatch(
        loginSuccess({ token: accessToken, username: response.data.username })
      );
      navigation.navigate("BottomTabs");
    } catch (error) {
      console.log(error);
      alert("로그인 실패!");
      dispatch(loginFail(error.message));
    }
  };

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

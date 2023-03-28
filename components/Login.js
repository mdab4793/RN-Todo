import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = () => {
    if (username === "1111" && password === "1111") {
      alert("로그인성공");
      navigation.navigate("Home");
    } else {
      alert("로그인실패");
      setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="이메일"
        onChangeText={(text) => setUsername(text)}
        value={username}
      ></TextInput>
      <TextInput
        style={styles.passwordInput}
        type="password"
        placeholder="비밀번호"
        onChangeText={(text) => setPassword(text)}
        value={password}
        //비밀번호안보이게
        secureTextEntry={true}
      ></TextInput>
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
}

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

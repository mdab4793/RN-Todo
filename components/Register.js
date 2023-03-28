import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("http://15.164.230.202:3011/auth/signup", { email, password })
      .then((response) => {
        alert("회원가입 성공!");
        console.log(response);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("회원가입 실패", error.response.data.message);
      });
  };

  // if (!email) return null;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <Button title="회원가입" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Register;

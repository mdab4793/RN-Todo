import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { theme } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const apiUrl = process.env.API_URL;
const Todo = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  // store에서 accessToken 값을 가져온다.
  const accessToken = useSelector((state) => state.authSlice.accessToken);
  useEffect(() => {
    axios
      .get(`${apiUrl}/moni-app`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((result) => {
        setTodos(result.data.result);
      })
      .catch((error) => {
        console.error("실패", error);
      });
  }, []);

  const handleAddTodo = () => {
    if (inputText !== "") {
      const newTodo = {
        key: Date.now().toString(),
        appname: inputText,
        keyword: "ㄴ",
        country: "ㄴ",
        storeId: "8",
        store: "ㄴ",
      };
      axios
        .post(`${apiUrl}/moni-app`, newTodo, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setTodos([...todos, response.data]);
          setInputText("");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //   //TodoList추가 함수
  //   const handleAddTodo = async () => {
  //     //만약 inputText가 공백 ("")이아니면,즉 글자가 있을경우에만 리스트에 추가된다.
  //     if (inputText !== "") {
  //       //...todos는 todos 배열의 모든 항목을 복사하는 스프레드 연산자.
  //       //이를 사용하여 새로운 배열을 생성하면 이전 배열의 모든 항목이 새 배열에 복사된다.
  //       //...todos를 사용하지않을경우 추가되지않고 교체된다.
  //       //{ key: Date.now().toString(), text: inputText }
  //       // Date.now().toString()을 사용하여 현재 시간을 밀리초단위로 변환하여 고유한 값으로 생성해서key값으로 사용한다.
  //       //즉  Date.now().toString()이 고유id가 되는것!
  //       //text: inputText 가없으면 글입력이 안된다.
  //       const newTodo = { key: Date.now().toString(), text: inputText };
  //       try {
  //         const response = await axios.post(`${apiUrl}/moni-app`, newTodo);
  //         setTodos([...todos, response.data]);
  //         //리스트에 추가된후엔 input은 공백으로 비워진다.
  //         setInputText("");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   const handleDeleteTodo = (id) => {
  //     const newTodos = todos.filter((todo) => todo.key !== id);
  //     setTodos(newTodos);
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(appname) => setInputText(appname)}
          placeholder="Enter a to-do item"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.appname}</Text>
            <TouchableOpacity>
              <Entypo name="trash" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "70%",
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    marginTop: 10,
    width: "80%",
  },
  todoItem: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default Todo;

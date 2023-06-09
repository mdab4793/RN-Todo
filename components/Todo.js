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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store";

const apiUrl = process.env.API_URL;
const Todo = () => {
  const [inputText, setInputText] = useState("");
  //수정 modal
  const [updateModal, setUpdateModal] = useState(false);
  //수정 inputText
  const [updateInput, setUpdateInput] = useState("");
  // 현재 선택된 항목의 ID를 저장하는 상태 추가
  const [selectedItemId, setSelectedItemId] = useState(null);

  // store에서 accessToken 값을 가져온다.
  const accessToken = useSelector((state) => state.authSlice.accessToken);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosSlice);
  //최초랜더링 될때 get되는 애
  useEffect(() => {
    console.log("inuseEffect");
    //get요청 함수를 넣어서 최초랜더링될때 get요청 받을수있게한다.
    getTodos();
  }, []);
  //get요청 함수
  const getTodos = async () => {
    axios
      .get(`${apiUrl}/moni-app`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.result);
        dispatch(setTodos(response.data.result));
      })
      .catch((error) => {
        console.log("실패", error);
        alert("실패");
      });
  };
  //post요청
  const handleAddTodo = () => {
    if (inputText !== "") {
      const newTodo = {
        appname: inputText,
        keyword: inputText,
        country: inputText,
        storeId: inputText,
        store: inputText,
      };

      axios
        .post(`${apiUrl}/moni-app`, newTodo, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          // 기존에 있는 todos와 새로 추가된 todo를 합쳐서 상태를 업데이트
          console.log("in post axios", response.data);
          //get요청 함수를 사용해서 post요청을 한후 바로 get요청을 받아와서
          //할일 추가하면 바로 화면에 추가되게끔 getTodos()함수를 사용한다.
          getTodos();
          //dispatch(setTodos([...todos, response.data]));
          setInputText("");
          // alert("성공");
        })
        .catch((error) => {
          console.log(error);
          alert("실패");
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

  //삭제함수
  const handleDeleteTodo = (id) => {
    console.log(`${apiUrl}/moni-app/${id}`, id, "inDeleteTodo");
    axios
      .delete(`${apiUrl}/moni-app/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        dispatch(setTodos(todos.filter((item) => item.id !== id)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // //수정함수
  // const handleUpdateTodo = (id) => {
  //   if (updateInput !== "") {
  //     const updateTodo = {
  //       appname: updateInput,
  //     };
  //     // console.log(apiUrl);
  //     // console.log(`${apiUrl}/moni-app/${id}`, id, updateTodo, "inupdateTodo");
  //     axios
  //       .patch(`${apiUrl}/moni-app/${id}`, updateTodo, {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       })
  //       .then((response) => {
  //         getTodos();
  //         setUpdateModal(false);
  //       })
  //       .catch((error) => {
  //         console.log("Error in PATCH request:", error.response); // 오류 메시지 출력
  //         alert("실패");
  //       });
  //   }
  // };

  //수정함수
  const handleUpdateTodo = (id) => {
    if (updateInput !== "") {
      axios
        .patch(
          `${apiUrl}/moni-app/${id}`,
          { appname: updateInput },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          getTodos();
          setUpdateModal(false);
        })
        .catch((error) => {
          console.log("Error in PATCH request:", error.response); // 오류 메시지 출력
          alert("실패");
        });
    }
  };

  // console.log(todos, "in render");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
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
            <View style={styles.todoIcon}>
              <TouchableOpacity>
                <Entypo
                  style={styles.iconButton}
                  name="trash"
                  onPress={() => {
                    handleDeleteTodo(item.renderItem);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  style={styles.iconButton}
                  name="edit"
                  onPress={() => {
                    setUpdateModal(true);
                    setUpdateInput(item.appname);
                    setSelectedItemId(item.id); // 선택한 항목의 ID를 저장
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {updateModal == true ? (
        <View style={styles.updateContainer}>
          <TextInput
            style={styles.input}
            defaultValue={updateInput}
            onChangeText={(text) => setUpdateInput(text)}
            placeholder="update to-do item"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              handleUpdateTodo(selectedItemId); // 저장된 항목 ID를 사용하여 함수 호출
            }}
          >
            <Text style={styles.addButtonText}>update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setUpdateModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  todoIcon: { flexDirection: "row", alignItems: "center" },
  iconButton: {
    marginHorizontal: 5,
    color: "black",
    fontSize: 18,
  },
  updateContainer: {
    position: "absolute",
    top: 120,
    backgroundColor: "gray",
    width: "80%",
    height: 180,
    borderRadius: 5,
    flex: 1,
  },
});
export default Todo;

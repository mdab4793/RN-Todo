import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoList from "./TodoList";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import MyPage from "./MyPage";
import Todo from "./Todo";
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} /> */}
      {/* <Tab.Screen name="TodoList" component={TodoList}>
        <Entypo name="add-to-list" size={24} color="black" />
      </Tab.Screen> */}
      {/* <Tab.Screen
        name="TodoList"
        component={TodoList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

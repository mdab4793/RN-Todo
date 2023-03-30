import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoList from "./TodoList";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import MyPage from "./MyPage";

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} /> */}
      {/* <Tab.Screen name="TodoList" component={TodoList}>
        <Entypo name="add-to-list" size={24} color="black" />
      </Tab.Screen> */}
      <Tab.Screen
        name="TodoList"
        component={TodoList}
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

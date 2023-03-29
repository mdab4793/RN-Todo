import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import Register from "./Register";
import TodoList from "./TodoList";
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

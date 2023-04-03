import { View, Text, Button } from "react-native";
import { logout } from "./../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    dispatch(logout());

    navigation.navigate("Login");
    alert("로그아웃되었습니다.또 만나요");
  };
  return (
    <View>
      <Button title="로그아웃" onPress={handleLogout} />
      <Text>이름</Text>
      <Text>내정보</Text>
      <Text>이미지</Text>
    </View>
  );
};

export default MyPage;

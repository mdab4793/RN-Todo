import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const image = {
  uri: "https://github.com/mdab4793/shop/blob/main/background/1.jpeg?raw=true",
};
const Splash = () => {
  return (
    <View>
      <ImageBackground
        source={image}
        style={{ width: "100%", height: "100%" }}
      ></ImageBackground>
    </View>
  );
};

export default Splash;

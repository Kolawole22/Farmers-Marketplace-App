import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationBar from "../components/common/NavigationBar";
import SafeAreaComponent from "../components/common/SafeAreaComponent";

const { width, height } = Dimensions.get("window");

const LayoutWithBottomTab = ({ children, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        height: height,
        backgroundColor: "red",
        position: "relative",
      }}
    >
      {children}
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

export default LayoutWithBottomTab;

const styles = StyleSheet.create({});

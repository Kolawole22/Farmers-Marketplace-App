import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "./constants";

const FilterPanel = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.blackTrans80,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 30,
      }}
    >
      <Text>Welcome to bassouri</Text>
    </View>
  );
};

export default FilterPanel;

const styles = StyleSheet.create({});

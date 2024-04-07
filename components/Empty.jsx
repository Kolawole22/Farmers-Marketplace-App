import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "./constants";

const Empty = ({ text, subtext }) => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }}>

      <Image
        source={require("../assets/images/emptyImg.png")}

        resizeMode="contain"
        style={{
          width: 150,
          height: 150

        }}
      />

      <Text style={{
        fontFamily: "montBold",
        fontSize: 14,
        marginBottom: 4,
        color: COLORS.input,

      }} >{text}</Text>

      <Text
        style={{
          fontFamily: "montReg",
          fontSize: 12,
          color: COLORS["80%"],
        }} 
      >{subtext}</Text>

    </View>
  )
}

export default Empty

const styles = StyleSheet.create({})

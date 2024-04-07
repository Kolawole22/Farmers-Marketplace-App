import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { useWindowDimensions } from "react-native";

const OnboardingItem = ({ item }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.containerItem, { width, height }]}>
      <Image
        source={item.item.image}
        style={[styles.imageItem, { width }]}
        resizeMode="contain"
      />
      <ImageBackground
        style={[styles.imageBgView, { width }]}
        width={width}
        source={require("../../assets/images/ussd.png")}
        resizeMode="contain"
        imageStyle={{ height: "100% " }}
      >
        {/* <Text style={styles.titleText} >{item.item.title.split(' ').splice(1).join(" ")}</Text> */}
        <Text style={styles.titleText}>{item.item.title}</Text>
        <Text style={styles.descText}>{item.item.description}</Text>
        {item.item.description2 && (
          <Text style={styles.descText}>{item.item.description}</Text>
        )}
      </ImageBackground>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  containerItem: {
    flex: 1,
    // height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.textGray,
  },
  imageBg: {},
  imageItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    padding: 10,
  },
  imageBgView: {
    position: "absolute",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    bottom: -5,
    height: "50%",
    // width: "100%",
    paddingHorizontal: 16,
    paddingTop: 75,
  },
  titleText: {
    fontSize: 24,
    // fontWeight: 700,
    color: COLORS.white,
    fontFamily: "space500",
  },
  titleTextLight: {
    fontSize: 38,
    // fontWeight: 300,
    color: COLORS.white,
    fontFamily: "space100",
  },
  descText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: "space100",
    marginTop: 20,
    textAlign: "center",
  },
});

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useRouter } from "expo-router";

const PostBoarding = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={a.container}>
      <View style={a.container}>
        <View style={a.content}>
          <Text style={a.welcome}>Welcomed to</Text>
          <Text style={a.title}>
            My Home<Text style={a.subtitle}>town</Text> Farm market
          </Text>
          <Text style={a.parag}>
            You are at the right place, choose the best sect that describes you
          </Text>
        </View>
        <View style={a.links}>
          <TouchableOpacity
            onPress={() => {
              router.push("/signUp");
            }}
            style={a.link}
          >
            <Text style={a.linkText}>Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={a.link}>
            <Text style={a.linkText}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={a.link}>
            <Text style={a.linkText}>Agent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={a.logoView}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          style={{
            width: 58,
            height: 34,
          }}
        />

        <Text style={a.ifad}>An IFAD Assisted LIFE-ND Project Initiative</Text>
      </View>
    </SafeAreaView>
  );
};

export default PostBoarding;

const a = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 80,
    width: "100%",
  },
  content: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
  },
  welcome: {
    fontFamily: "space400",
    fontSize: 18,
    color: COLORS.white,
  },
  title: {
    fontFamily: "space500",
    fontSize: 18,
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: "space500",
    fontSize: 24,
    color: COLORS.secondary,
  },
  parag: {
    fontFamily: "space200",
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
    marginTop: 16,
  },

  links: {
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 26,
    width: "100%",
    alignContent: "stretch",
  },
  link: {
    backgroundColor: COLORS.white,
    height: 64,
    width: 300,
    borderRadius: 6,
    // maxWidth: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontFamily: "space300",
    color: COLORS.primary,
  },
  logoView: {
    margin: 0,
    gap: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ifad: {
    color: COLORS.white,
    fontFamily: "space200",
    fontSize: 14,
  },
});

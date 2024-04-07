import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../../components/constants";
import { ArrowLeft, CloseCircle } from "iconsax-react-native";

const Home = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>List your first product</Text>
          <TouchableOpacity style={styles.flexCenter}>
            <CloseCircle color={COLORS.white} variant="Bold" size="22" />
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <Text style={styles.topTxt}>
            {" "}
            Lorem ipsum dolor sit amet consectetur. Sed velit nisl maecenas
            laoreet feugiat.
          </Text>
        </View>
        <ScrollView style={styles.scrollContainer}></ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  layout: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  topBar: {
    height: 95,
    backgroundColor: COLORS.primary,
    justifyContent: "flex-end",
    width: "100%",
  },
  topBarItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  titleTxt: {
    fontFamily: "space500",
    color: COLORS.white,
    fontSize: 24,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  // OTHER STYLES BEGIN HERE
  safeContainer: {
    paddingHorizontal: 16,
    flex: 1,
    width: "100%",
  },
  topView: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 24,
  },
  topTxt: {
    fontFamily: "space300",
    fontSize: 14,
    color: COLORS.input,
  },
  scrollContainer: {
    width: "100%",
    backgroundColor: "coral",
  },
});

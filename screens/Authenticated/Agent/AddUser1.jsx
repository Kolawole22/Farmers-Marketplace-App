import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle } from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  ImageInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";

const AddUser1 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={[styles.layout]}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity
            style={styles.flexCenter}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>Add User</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <View style={styles.stepView}>
            <Text style={styles.step}> Please choose the user role</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          {/* BUTTON COMPONENT */}
          {loading === true ? (
            <View
              style={{
                width: "100%",
                height: 40,
                marginVertical: 20,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("addUser2");
                // setIsAuhtenticated(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Farmers</Text>
            </TouchableOpacity>
          )}

          {/* BUTTON COMPONENT */}
          {loading === true ? (
            <View
              style={{
                width: "100%",
                height: 40,
                marginVertical: 20,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("addBuyer1");
                // setIsAuhtenticated(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Buyers</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddUser1;

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
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
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
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 48,
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "montMid",
    fontSize: 16,
  },
  stepView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  step: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS.input,
  },
});

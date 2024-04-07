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
  PasswordInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";

const SetPassword = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { userId } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toastValues, setToastValues, setIsNewUser, setIsAuhtenticated } =
    useContext(GlobalContext);

  const completeRegistration = async () => {
    setLoading(true);

    if (password === "" || confirmPassword === "") {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "Please do not leave any field empty",
      });
      return;
    } else if (password !== confirmPassword) {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "Passwords do not match",
      });
      return;
    } else {
      const data = {
        password: password,
      };

      console.log("data to submit:::", data);

      if (userId !== null) {
        axios
          .patch(
            `${BACKEND_URL}/accounts/farmer_registration/${userId}/update_password/`,
            data
          )
          .then((res) => {
            console.log("farmer signup response:::", res.data);
            if (res.status === 200 || res.status === 201) {
              navigation.navigate("agentDashboard");
              setToastValues({
                ...toastValues,
                show: true,
                type: "Success",
                message: "User added successfully.",
              });
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
              console.log("Error response data:", err.response.data);
              if (err.response.data.phone_number)
                setToastValues({
                  ...toastValues,
                  show: true,
                  type: "Error",
                  message: err.response.data.phone_number[0],
                });
              if (err.response.data.email)
                setToastValues({
                  ...toastValues,
                  show: true,
                  type: "Error",
                  message: err.response.data.email[0],
                });
            } else if (err.request) {
              console.log("No response received:", err.request);
              setToastValues({
                ...toastValues,
                show: true,
                type: "Error",
                message: err.request.data.detail,
              });
            } else {
              console.log("Request error:", err.message);
              setToastValues({
                ...toastValues,
                show: true,
                type: "Error",
                message: err.message,
              });
            }
          });
      }
    }
  };

  return (
    <View style={[styles.layout]}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>Add User</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <View style={styles.stepView}>
            <Text
              style={{
                fontFamily: "montBold",
                fontSize: 28,
                color: COLORS.input,
                marginBottom: 12,
                marginTop: 10,
              }}
            >
              {" "}
              Set Password
            </Text>
            <Text style={styles.step}> Step 5/5</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <PasswordInput
            label="Password"
            placeholder="New Password"
            errorMsg="Must be more than 8 characters"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm New Password"
            errorMsg="Please make sure the passwords match"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          {/* BUTTON COMPONENT */}

          <TouchableOpacity
            onPress={() => {
              completeRegistration();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Complete User Registration </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SetPassword;

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

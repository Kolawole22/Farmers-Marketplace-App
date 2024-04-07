import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ArrowDown2, Eye, EyeSlash } from "iconsax-react-native";
import { COLORS, SIZES } from "../../../components/constants";
import { StyleSheet } from "react-native";
import Input, { LocationInput, PasswordInput } from "../../../components/Input";
import { TextInput } from "react-native";
import { GlobalContext } from "../../../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputDealerCreateNewPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [retrievedFarmerData, setRetrievedFarmerData] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toastValues, setToastValues, setIsNewUser, setIsAuhtenticated } =
    useContext(GlobalContext);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const completeRegistration = async () => {
    setLoading(true);

    const userId = await AsyncStorage.getItem("user_id");

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
              navigation.navigate("AwaitApproval");
              setToastValues({
                ...toastValues,
                show: true,
                type: "Success",
                message: res.data.message,
              });
              setIsNewUser(false);
              setIsAuhtenticated(false);
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
    <ImageBackground
      style={[
        styles.safeContainer,
        {
          width: "100%",
        },
      ]}
      source={require("../../../assets/images/formbg1.png")}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.register}>
          {/* HEADER TXT */}
          <Text style={styles.headTxt}>Create New Password</Text>
          <Text style={styles.stepTxt}>Step 4/4</Text>
          <Text style={styles.parag}>
            Your new password should be difficult to guess to guarantee the
            security of your data
          </Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <PasswordInput
                visible={visible}
                placeholder="New Password"
                errorMsg="Must be more than 8 characters"
                value={password}
                onChangeText={(text) => setPassword(text)}
                toggleVisible={toggleVisible}
              />

              <PasswordInput
                visible={visible}
                placeholder="Confirm New Password"
                errorMsg="Please make sure the passwords match"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                toggleVisible={toggleVisible}
              />

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
                    completeRegistration();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Complete Registration</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default InputDealerCreateNewPassword;

const styles = StyleSheet.create({
  register: {
    marginTop: 100,
    alignItems: "center",
  },

  safeContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    paddingTop: 4,
    width: "100%",
  },
  headTxt: {
    fontSize: 28,
    color: COLORS.primary,
    fontFamily: "space500",
    marginBottom: 24,
  },
  stepTxt: {
    fontSize: 16,
    fontFamily: "space200",
    color: COLORS.input,
    marginBottom: 32,
  },
  parag: {
    paddingHorizontal: 14,
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "space200",
    marginBottom: 24,
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 48,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "montMid",
    fontSize: 16,
  },
  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    marginTop: 10,
    marginBottom: 40,
  },
  dash: {
    width: 52,
    height: 2,
    backgroundColor: COLORS.black,
  },
  dividerText: {
    fontFamily: "space200",
    fontSize: SIZES.normal,
  },
  signInOptions: {
    width: "100%",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  signInOptionsImage: {
    width: 30,
    height: 30,
  },
  callToAction: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 2,
  },
  callQuestion: {
    fontFamily: "space200",
    fontSize: 12,
    color: COLORS.textGrayLight,
  },
  callAction: {
    fontFamily: "space200",
    fontSize: 12,
    color: COLORS.primary,
  },
});

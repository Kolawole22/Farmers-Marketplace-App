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
import { COLORS, SIZES } from "../../components/constants";
import { StyleSheet } from "react-native";
import Input, { LocationInput, PasswordInput } from "../../components/Input";
import { TextInput } from "react-native";
import { GlobalContext } from "../../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SigninBuyer = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    setIsAuhtenticated,
    setToastValues,
    toastValues,
    saveUserData,
    saveUserToken,
    userType,
    setIsNewUser,
  } = useContext(GlobalContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const signInUser = async () => {
    setLoading(true);

    const data = {
      contact: "+234" + phone,
      password: password,
    };

    if (phone === "" || password === "") {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "No field can be empty.",
      });
      return;
    } else {
      console.log("login credentials:::", data);
      axios
        .post(`${BACKEND_URL}/accounts/login/`, data)
        .then((res) => {
          console.log("login response:::", res.data);
          setLoading(false);
          saveUserData(res.data.user);
          saveUserToken(res.data.token);
          setIsAuhtenticated(true);
          AsyncStorage.setItem("user_type", "Buyer");
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            console.log("Error response data:", err.response.data);

            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              message: err.response.data.error,
            });
          } else if (err.request) {
            console.log("No response received:", err.request);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              // message: err.request.data.detail,
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
  };

  return (
    <ImageBackground
      style={[
        styles.safeContainer,
        {
          width: "100%",
        },
      ]}
      source={require("../../assets/images/formbg1.png")}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.register}>
          {/* HEADER TXT */}
          <Text style={styles.headTxt}>Log In</Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <Input
                label="Phone number"
                type="phone-pad"
                placeholder="Phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />

              <View style={{ marginVertical: 24 }}>
                <PasswordInput
                  placeholder="Password"
                  visible={visible}
                  toggleVisible={toggleVisible}
                  label="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>

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
                    // setIsAuhtenticated(true);
                    // setIsNewUser(false);
                    signInUser();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
              )}

              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ResetPassword");
                }}
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    fontFamily: "montReg",
                    color: COLORS["80%"],
                  }}
                >
                  Forgot Password
                </Text>
              </TouchableOpacity> */}

              <View style={styles.signInOptions}>
                <Text
                  style={{
                    fontFamily: "montMid",
                    color: COLORS["80%"],
                  }}
                >
                  Don't have an account?{" "}
                  <Text
                    onPress={() => {
                      navigation.navigate("SignupBuyer");
                    }}
                    style={{ color: COLORS.primary1 }}
                  >
                    Register
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default SigninBuyer;

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
    marginBottom: 65,
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
    textAlign: "center",
    fontFamily: "space200",
    marginBottom: 28,
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
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
    marginTop: 20,
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

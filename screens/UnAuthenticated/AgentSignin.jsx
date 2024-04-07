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
import { BACKEND_URL } from "../../config.service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgentSignin = ({ navigation }) => {
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
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const { setUserType } = useContext(GlobalContext);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const signInAgent = async () => {
    setLoading(true);

    const data = {
      code: code,
      password: password,
    };

    if (code === "" || password === "") {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "No field can be empty",
      });
      return;
    } else {
      console.log("Available data:::", data);
      axios
        .post(`${BACKEND_URL}/accounts/agent/login/`, data)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setLoading(true);
            setIsAuhtenticated(true);
            saveUserData(res.data.user);
            saveUserToken(res.data.token);
            setIsNewUser(false);
            AsyncStorage.setItem("user_type", userType);
            AsyncStorage.setItem("user_id", res.data.user.id);
            console.log(res.data);
          }
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
          <Text style={styles.headTxt}>Sign In</Text>
          <Text style={styles.parag}>
            Only agents who have been onboarded manually has access to this
            page, input your Code ID and Password
          </Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <View style={{ marginTop: 24 }}>
                <Input
                  label="Agent Code ID"
                  type="default"
                  placeholder="Agent Code ID"
                  value={code}
                  onChangeText={(text) => setCode(text)}
                />
              </View>
              <View style={{ marginTop: 24 }}>
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  visible={visible}
                  toggleVisible={toggleVisible}
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
                    // navigation.navigate("agentDashboard");
                    // setIsAuhtenticated(true);
                    signInAgent();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              )}

              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ResetPassword");
                }}
                style={styles.forgotPwd}
              >
                <Text style={styles.forgotTxt}>Forgot Password</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AgentSignin;

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
    textAlign: "center",
    fontFamily: "montReg",
    fontSize: 16,
    marginBottom: 28,
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
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
  forgotPwd: {
    alignSelf: "flex-end",
  },
  forgotTxt: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS["80%"],
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

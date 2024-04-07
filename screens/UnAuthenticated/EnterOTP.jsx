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
import Input, { LocationInput } from "../../components/Input";
import { TextInput } from "react-native";
import { PinInput } from "@pakenfit/react-native-pin-input";
import axios from "axios";
import { BACKEND_URL } from "../../config.service";
import { GlobalContext } from "../../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EnterOTP = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { phone } = route.params;
  const { toastValues, setToastValues, userType } = useContext(GlobalContext);
  const [formReady, setFormReady] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // console.log("Phone_number in otp screen", phone);

  const verifyOtp = async () => {
    setLoading(true);

    const userId = await AsyncStorage.getItem("user_id");

    const userRoute =
      userType === "Input Dealer"
        ? "input_dealer_register"
        : userType === "Farmer"
        ? "farmer_registration"
        : null;

    if (userId !== null) {
      const data = {
        phone_number: "+234" + phone,
        otp: otp,
      };

      console.log("Data:::", data);
      if (otp === "") {
        setFormReady(false);
        setLoading(false);
        return;
      } else {
        setFormReady(true);
        console.log(`${BACKEND_URL}/accounts/verify-otp/`);
        axios
          .post(`${BACKEND_URL}/accounts/verify-otp/`, data)
          .then((res) => {
            console.log("verify response:::", res.data);
            console.log(
              `${BACKEND_URL}/accounts/${userRoute}/${userId}/update_number/`
            );
            axios
              .patch(
                `${BACKEND_URL}/accounts/${userRoute}/${userId}/update_number/`,
                data
              )
              .then((res) => {
                console.log(
                  "opt response",
                  res.data,
                  "otp status:::",
                  res.status
                );
                if (res.status === 200 || res.status === 201) {
                  setToastValues({
                    ...toastValues,
                    show: true,
                    type: "Success",
                    message: res.data.message,
                  });
                  setLoading(false);
                  navigation.navigate("VerifyIdentity");
                } else {
                  setToastValues({
                    ...toastValues,
                    show: true,
                    type: "Error",
                    message: res.data.detail,
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
                    message: err.request.data,
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
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: res.data.detail,
            });
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
              console.log("Error response data:", err.response.data);
              setToastValues({
                ...toastValues,
                show: true,
                type: "Error",
                message: err.response.data.detail,
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

  const resendOtp = async () => {
    setResendLoading(true);

    const data = {
      phone_number: "+234" + phone,
    };

    if (phone === "") {
      setResendLoading(false);
      return;
    } else {
      console.log("data:::", data);
      axios
        .post(`${BACKEND_URL}/accounts/verify-phone/`, data)
        .then((res) => {
          console.log("opt response", res.data, "otp status:::", res.status);
          if (res.status === 200 || res.status === 201) {
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: res.data.detail,
            });
            navigation.navigate("EnterOTP", {
              phone: phone,
            });
          } else {
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              message: res.data.detail,
            });
          }
          setResendLoading(false);
        })
        .catch((err) => {
          setResendLoading(false);
          if (err.response) {
            console.log("Error response data:", err.response.data);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              message: err.response.data.detail,
            });
            if (err.response.data.phone_number)
              setToastValues({
                ...toastValues,
                show: true,
                type: "Error",
                message: err.response.data.phone_number[0],
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
          <Text style={styles.headTxt}>Enter OTP</Text>
          <Text style={styles.parag}>
            We have sent a 4 digit OTP to your mobile number, enter OTP to
            continue your registration
          </Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <PinInput
                inputStyle={{
                  fontFamily: "montSBold",
                  width: 32,
                  height: 32,
                  fontSize: 16,
                }}
                containerStyle={{
                  padding: 10,
                }}
                length={4}
                onFillEnded={(otp) => {
                  console.log(otp);
                  setOtp(otp);
                }}
              />

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                  marginBottom: 6,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: "montReg",
                    fontSize: 14,
                    color: COLORS.input,
                  }}
                >
                  Didn't receieve code?{" "}
                </Text>
                <TouchableOpacity onPress={resendOtp}>
                  <Text
                    style={{
                      fontFamily: "montReg",
                      fontSize: 14,
                      color: COLORS.accent,
                    }}
                  >
                    {resendLoading ? "Resending..." : "Resend"}
                  </Text>
                </TouchableOpacity>
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
                    verifyOtp();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Verify Phone Number</Text>
                </TouchableOpacity>
              )}

              <View style={styles.signInOptions}></View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default EnterOTP;

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
    marginBottom: 12,
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
    color: COLORS["80%"],
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginVertical: 16,
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

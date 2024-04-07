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
import { PinInput } from "@pakenfit/react-native-pin-input";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerifyOTP = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { phone, userId } = route.params;
  const { toastValues, setToastValues, userType } = useContext(GlobalContext);
  const [otp, setOtp] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const verifyOtp = async () => {
    setLoading(true);

    // const userId = await AsyncStorage.getItem("user_id");

    if (userId !== null) {
      const data = {
        phone_number: "+234" + phone,
        otp: otp,
      };

      console.log("Data:::", data);
      if (otp === "") {
        setLoading(false);
        return;
      } else {
        console.log(`${BACKEND_URL}/accounts/verify-otp/`);
        axios
          .post(`${BACKEND_URL}/accounts/verify-otp/`, data)
          .then((res) => {
            console.log("verify response:::", res.data);
            console.log(
              `${BACKEND_URL}/accounts/farmer_registration/${userId}/update_number/`
            );
            axios
              .patch(
                `${BACKEND_URL}/accounts/farmer_registration/${userId}/update_number/`,
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
                  navigation.navigate("verifyID", {
                    userId: userId,
                  });
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
          <Text style={styles.topTxt}></Text>

          <View style={styles.stepView}>
            {/* <Text style={styles.step} > Step 1/3</Text> */}
            <Text
              style={{
                fontSize: 28,
                fontFamily: "montBold",
                color: COLORS.input,
              }}
            >
              {" "}
              Enter OTP
            </Text>
          </View>

          <Text style={styles.topTxt}>
            We have sent a 4 digit OTP to your mobile number, enter OTP to
            continue your registration.
          </Text>
        </View>

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
              marginBottom: 26,
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

          <TouchableOpacity
            onPress={() => {
              verifyOtp();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Verify Phone Number</Text>
          </TouchableOpacity>

          <View style={styles.signInOptions}></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VerifyOTP;

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
    fontFamily: "montReg",
    fontSize: 16,
    textAlign: "center",
    color: COLORS.input,
    marginTop: 20,
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
    marginTop: 18,
  },
  step: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS.input,
  },
  viewForm: {
    paddingHorizontal: 16,
  },
});

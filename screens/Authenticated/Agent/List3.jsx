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

const List2 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisisble] = useState(true);

  return (
    <View style={[styles.layout]}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>List a product</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <Text style={styles.topTxt}></Text>

          <View style={styles.stepView}>
            <Text style={styles.step}> Step 3/3</Text>
          </View>

          <Text style={styles.topTxt}>
            We have sent a 4 digit OTP to your mobile number, this is to verify
            that you have access to{" "}
            <Text style={{ fontFamily: "montMid" }}>USSD</Text>, enter OTP to
            continue your process
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
              marginBottom: 6,
            }}
          >
            {/* <Text
                            style={{
                                fontFamily: "montReg",
                                fontSize: 14,
                                color: COLORS.input,
                            }}
                        >
                            Didn't receieve code?{" "}
                            <Text
                                // onPress={callOtpEndPoint}
                                style={{
                                    fontFamily: "montReg",
                                    fontSize: 14,
                                    color: COLORS.accent,
                                }}
                            >
                                Resend
                            </Text>
                        </Text> */}
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
                navigation.navigate("listSuccess");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Verify Phone Number</Text>
            </TouchableOpacity>
          )}

          <View style={styles.signInOptions}></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default List2;

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

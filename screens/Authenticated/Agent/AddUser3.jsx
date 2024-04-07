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
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";

const AddUser3 = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { toastValues, setToastValues } = useContext(GlobalContext);
  const params = route.params;

  useEffect(() => {
    console.log("Passed params:::", params);
  }, []);

  const getOtp = async () => {
    setLoading(true);

    const data = {
      phone_number: "+234" + phone,
    };

    if (phone === "") {
      setLoading(false);
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
            navigation.navigate("verifyOTP", {
              phone: phone,
              userId: params.userId,
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
          <View style={styles.stepView}>
            <Text style={styles.step}> Step 3/5</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          <Input
            label="Active Phone Number"
            type="phone-pad"
            placeholder="+2348158482123"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          {/* BUTTON COMPONENT */}

          <TouchableOpacity
            onPress={() => {
              getOtp();
              // setIsAuhtenticated(true);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddUser3;

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

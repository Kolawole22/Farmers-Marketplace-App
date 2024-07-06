import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ArrowDown2, Eye, EyeSlash } from "iconsax-react-native";
import { COLORS, SIZES } from "../../components/constants";
import { StyleSheet } from "react-native";
import Input, { LocationInput, StatePicker } from "../../components/Input";
import { TextInput } from "react-native";
import axios from "axios";
import { GOOGLE_MAP_APIKEY, BACKEND_URL } from "../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/context.service";
import * as Location from "expo-location";

const Signup = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    farm_name: "",
    state: "",
    local_govt: "",
    farm_address: "",
    manual_address: "",
  });
  const { setToastValues, toastValues, selectedState, selectedLocalGovt } =
    useContext(GlobalContext);
  const [formReady, setFormReady] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  //console.log("kk", GOOGLE_MAP_APIKEY);

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Location:::", location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAP_APIKEY}`;
    setLocationLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract the address from the response
        const address = data.results[0]?.formatted_address;
        console.log("Address:", address);
        setValues({ ...values, farm_address: address });
        setLocationLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLocationLoading(false);
      });
  };

  const registerFarmer = async () => {
    setLoading(true);

    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      farm_name: values.farm_name,
      state: selectedState,
      local_govt: selectedLocalGovt,
      farm_address: values.farm_address,
      manual_address: values.manual_address,
    };

    if (
      values.first_name === "" ||
      values.last_name === "" ||
      values.email === "" ||
      values.farm_name === "" ||
      selectedState === "" ||
      null ||
      selectedLocalGovt === "" ||
      null ||
      values.farm_address === ""
    ) {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "Please fill all fields.",
      });
      return;
    } else if (
      values.first_name.length < 3 ||
      values.last_name.length < 3 ||
      !values.email.includes("@") ||
      !values.email.includes(".")
    ) {
      setLoading(false);

      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "Please fix issues on the form before proceeding",
      });
      return;
    } else {
      axios
        .post(`${BACKEND_URL}/accounts/register/farmer/`, data)
        .then((res) => {
          console.log("farmer signup response:::", res.data);
          if (res.status === 200 || res.status === 201) {
            setLoading(false);
            navigation.navigate("SignupStep2");
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: "Account registered. Please continue.",
            });
            AsyncStorage.setItem("user_id", res.data.id);
          }
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.register}>
          {/* HEADER TXT */}
          <Text style={styles.headTxt}>Register</Text>
          <Text style={styles.stepTxt}>Step 1/4</Text>
          <Text style={styles.parag}>Create an account as a Farmer</Text>
          <Text>OR</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signin")}
            style={[styles.button, { width: "80%" }]}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <View style={{ marginTop: 24 }}>
                <Input
                  label="First Name"
                  type="default"
                  placeholder="Enter Your First Name"
                  value={values.first_name}
                  onChangeText={(text) =>
                    setValues({ ...values, first_name: text })
                  }
                />
              </View>
              <View style={{ marginTop: 24 }}>
                <Input
                  label="Last Name"
                  type="default"
                  placeholder="Enter Your Last Name"
                  value={values.last_name}
                  onChangeText={(text) =>
                    setValues({ ...values, last_name: text })
                  }
                />
              </View>
              <View style={{ marginTop: 24 }}>
                <Input
                  label="Email Address"
                  type="email-address"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChangeText={(text) => setValues({ ...values, email: text })}
                />
              </View>

              <View style={{ marginTop: 24 }}>
                <Input
                  label="Farm Name"
                  type="default"
                  placeholder="Enter Your Farm Name"
                  value={values.farm_name}
                  onChangeText={(text) =>
                    setValues({ ...values, farm_name: text })
                  }
                />
              </View>

              <View style={{ marginTop: 24 }}>
                <StatePicker label={"State"} nextLabel={"Local Government"} />
              </View>

              <View style={{ marginTop: 24 }}>
                <LocationInput
                  type="text"
                  placeholder="Tap icon to track your location"
                  value={values.farm_address}
                  locationAction={getCurrentLocation}
                  locationLoading={locationLoading}
                />
              </View>

              <View style={{ marginTop: 24 }}>
                <Input
                  label="Manual address (optional)"
                  type="default"
                  placeholder="Enter Your Farm Address"
                  value={values.manual_address}
                  onChangeText={(text) =>
                    setValues({ ...values, manual_address: text })
                  }
                />
              </View>

              {loading ? (
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
                  onPress={registerFarmer}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}

              <View style={styles.signInOptions}></View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Signup;

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
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginVertical: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 48,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "space400",
    fontSize: SIZES.normal,
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

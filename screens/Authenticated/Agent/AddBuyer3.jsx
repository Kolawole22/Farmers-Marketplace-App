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
import Input, {
  LocationInput,
  PasswordInput,
  SearchInput,
} from "../../../components/Input";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { GlobalContext } from "../../../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";

const AddBuyer3 = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confrmPassword, setConfirmPassword] = useState("");
  const [base64, setBase64] = useState("");
  const {
    setIsAuhtenticated,
    setToastValues,
    toastValues,
    setIsNewUser,
    saveUserData,
    saveUserToken,
    userType,
    buyerInterests,
  } = useContext(GlobalContext);
  const { buyerId } = route.params;

  useEffect(() => {
    (async () => {
      const savedBuyerData = await AsyncStorage.getItem("BuyerSignupData");

      if (savedBuyerData !== null) {
        console.log("Saved data:::", savedBuyerData);
      } else {
        console.log("There's no buyer data");
      }
    })();
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please grant permission to access the media library to pick an image."
      );
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // You can also convert the image to a base64 string here
      const base64 = await convertImageToBase64(result.uri);
      // Now you can send the 'base64' string to your backend
      console.log(base64);
      setBase64(base64);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const registerBuyer = async () => {
    setLoading(true);

    const data = {
      photo: base64,
      password: password,
    };

    if (password === "" || confrmPassword === "") {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Erro",
        message: "No field should be empty.",
      });
      return;
    } else if (password !== confrmPassword) {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Erro",
        message: "Passwords do not match.",
      });
      return;
    } else {
      axios
        .patch(
          `${BACKEND_URL}/accounts/customer_registration/${buyerId}/update_photo_and_pass/`,
          data
        )
        .then((res) => {
          console.log("Buyer register response:::", res.data);
          navigation.navigate("agentDashboard");
          setToastValues({
            ...toastValues,
            show: true,
            type: "Success",
            message: "Buyer created successfully",
          });
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

    // let actualRegData;

    // if (savedBuyerData !== null) {
    //   console.log("Saved data:::", savedBuyerData);
    //   const parsedUserData = JSON.parse(savedBuyerData);
    //   actualRegData = { ...parsedUserData, photo: base64, password: password };

    // } else {
    //   console.log("There's no buyer data");
    // }
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
          <Text style={styles.headTxt}>Own Your Account</Text>
          <Text style={styles.stepTxt}>Step 3/3</Text>
          <View
            style={{
              height: 148,
              width: 148,
              position: "relative",
            }}
          >
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/images/uploadImg.png")
              }
              resizeMode="contain"
              style={{
                height: 148,
                width: 148,
                borderRadius: 100,
              }}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{
                height: 44,
                width: 44,
                position: "absolute",
                bottom: 6,
                right: 6,
              }}
            >
              <Image
                source={require("../../../assets/images/camicon.png")}
                resizeMode="contain"
                style={{
                  height: 44,
                  width: 44,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <PasswordInput
                label="Password"
                // visible={visible}
                // toggleVisible={toggleVisible}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <PasswordInput
                label="Confirm Password"
                // visible={visible}
                // toggleVisible={toggleVisible}
                placeholder="Confirm Password"
                value={confrmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />

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
                  onPress={() => {
                    registerBuyer();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Complete Registration</Text>
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

export default AddBuyer3;

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
    alignItems: "center",
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
    fontFamily: "montReg",
    fontSize: 14,
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "montMid",
    fontSize: 16,
  },
});

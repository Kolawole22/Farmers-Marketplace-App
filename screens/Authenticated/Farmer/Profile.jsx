import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ArrowDown2,
  Edit,
  Eye,
  EyeSlash,
  UserSquare,
} from "iconsax-react-native";
import { COLORS, SIZES } from "../../../components/constants";
import { StyleSheet } from "react-native";
import Input, {
  LocationInput,
  PasswordInput,
  SearchInput,
} from "../../../components/Input";
import { TextInput } from "react-native";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import { farmerProfileLinks } from "../../../components/constants/slides";
import Prompt from "../../../components/Prompt";
import { GlobalContext } from "../../../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { BACKEND_URL } from "../../../config.service";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    openModal,
    setOpenModal,
    setModalTitle,
    setModalSubtitle,
    setModalAction,
    toastValues,
    setToastValues,
  } = useContext(GlobalContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");

      if (userData !== null) {
        setUserData(JSON.parse(userData));
      }
    })();
  }, [userData]);

  const [image, setImage] = useState(null);
  const updateProfile = async ({ image, imgName }) => {
    const asyncToken = await AsyncStorage.getItem("user_token");
    setLoading(true);

    await axios
      .put(
        `${BACKEND_URL}/accounts/profile/update/`,
        //formData,
        { photo: image },
        {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
            Accept: "application/json",
            //"Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (res) => {
        setLoading(false);
        setToastValues({
          ...toastValues,
          show: true,
          type: "Success",
          message: "Your profile Picture has been updated successfully.",
        });
        console.log("ttt", res.data);
        await AsyncStorage.setItem("user_data", JSON.stringify(res.data));
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log("kmj", result.assets[0].uri);
      updateProfile({
        image: result.assets[0].base64,
        imgName: result.assets[0].fileName,
      });
      //setBase64(base64);
    }
  };

  return (
    <SafeAreaComponent>
      <View style={{ flex: 1, height: height }}>
        <View style={styles.register}>
          {/* HEADER TXT */}
          <Text style={styles.headTxt}>Profile</Text>
          <View
            style={{
              height: 96,
              width: 96,
              position: "relative",
            }}
          >
            <Image
              source={
                userData?.photo
                  ? { uri: userData?.photo }
                  : require("../../../assets/images/userImg.png")
              }
              resizeMode="cover"
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{
                height: 28,
                width: 28,
                position: "absolute",
                bottom: 6,
                right: 6,
              }}
            >
              <Image
                source={require("../../../assets/images/camicon.png")}
                resizeMode="contain"
                style={{
                  height: 28,
                  width: 28,
                }}
              />
            </TouchableOpacity>
            {loading === true && (
              <View
                style={{
                  width: "100%",
                  height: 40,
                  //marginVertical: 20,
                }}
              >
                <ActivityIndicator />
              </View>
            )}

            {/* <TouchableOpacity
              onPress={() => {}}
              style={{
                height: 28,
                width: 28,
                position: "absolute",
                bottom: 6,
                right: 6,
              }}
            >
              <Image
                source={require("../../../assets/images/camicon.png")}
                resizeMode="contain"
                style={{
                  height: 28,
                  width: 28,
                }}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* BUTTON */}
        <View
          style={{
            marginHorizontal: 16,
            alignItems: "center",
          }}
        >
          <Text style={styles.username}>
            {userData?.first_name} {userData?.last_name}
          </Text>
          <Text style={styles.companyName}>{userData?.farm_name}</Text>
        </View>

        <View
          style={{
            marginHorizontal: 16,
            marginVertical: 22,
            alignItems: "center",
            width: "100%",
            gap: 16,
          }}
        >
          {farmerProfileLinks?.map((link) => (
            <TouchableOpacity
              onPress={() => {
                if (typeof link.route !== "string") {
                  setOpenModal(true);
                  if (link.title === "Delete Account") {
                    setModalTitle("Delete Account");
                    setModalSubtitle(
                      "Are you sure you want to delete your account? All your progress and saved details will be permanently deleted."
                    );
                    setModalAction("Yes, Delete");
                  }

                  if (link.title === "Log Out") {
                    setModalTitle("Log Out");
                    setModalSubtitle("Are you sure you want to logout?");
                    setModalAction("Yes, Log Out");
                  }
                } else {
                  navigation.navigate(link.route);
                }
              }}
              key={link.id}
              style={styles.profileLink}
            >
              {link.icon}
              <Text style={styles.linkTxt((title = link.title))}>
                {link.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default Profile;

const styles = StyleSheet.create({
  register: {
    marginTop: 30,
    alignItems: "center",
  },
  headTxt: {
    fontSize: 28,
    color: COLORS.primary,
    fontFamily: "space500",
    marginBottom: 12,
  },

  safeContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    alignItems: "center",
    width: "100%",
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
    backgroundColor: COLORS.primary1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 256,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "montMid",
    fontSize: 16,
  },
  username: {
    fontFamily: "montBold",
    fontSize: 16,
    color: COLORS.input,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  companyName: {
    fontFamily: "montBold",
    fontSize: 16,
    color: COLORS.primary1,
    textAlign: "center",
    marginBottom: 16,
  },
  profileLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
    height: 40,
    borderBottomWidth: 0.4,
    borderColor: COLORS.input10,
  },
  linkTxt: (title) => ({
    fontFamily: "montMid",
    fontSize: 16,
    color: title === "Log Out" ? COLORS.danger : COLORS.input,
  }),
});

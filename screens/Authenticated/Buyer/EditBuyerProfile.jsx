import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle } from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  EditableInput,
  EditableLocationInput,
  ImageInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../../../config.service";
import { GlobalContext } from "../../../context/context.service";

const EditBuyerProfile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [businessName, setBusinessName] = useState("");
  const { setToastValues, toastValues, fetchSalesBuyer } =
    useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");

      if (userData !== null) {
        setUserData(JSON.parse(userData));
      }
    })();
  }, []);

  const updateProfile = async () => {
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (businessName.length < 2) {
      setToastValues({
        ...toastValues,
        show: true,
        type: "Failure",
        message: "Your Business name is too short.",
      });
    }
    axios
      .patch(`${BACKEND_URL}/api/accounts/profile/update/`, data, {
        headers: {
          Authorization: `Bearer ${asyncToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setToastValues({
          ...toastValues,
          show: true,
          type: "Success",
          message: "Your profile has been updated successfully.",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.layout}>
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
          <Text style={styles.titleTxt}>Edit Profile</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          <View style={styles.register}>
            {/* HEADER TXT */}
            {/* <View
              style={{
                height: 96,
                width: 96,
                position: "relative",
              }}
            >
              <Image
                source={require("../../../assets/images/userImg.png")}
                resizeMode="contain"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
              <TouchableOpacity
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
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.formView}>
            <EditableInput
              label="Full Name"
              value={userData?.first_name + " " + userData?.last_name}
            />
            <EditableInput label="Email Address" value={userData?.email} />
            <EditableInput
              label="Business Name"
              value={userData?.business_name}
            />
            <EditableInput
              label="Active Phone Number"
              value={userData?.phone_number}
              Type="number"
            />
            {/* <EditableLocationInput
              label="Shop Address"
              value=""
              Type="number"
              placeholder={"Type address or use geo location"}
            /> */}
          </View>
          {/* BUTTON COMPONENT */}
          {/* <TouchableOpacity onPress={updateProfile}>
            <Text>Update Profile</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EditBuyerProfile;

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
    gap: 10,
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
    backgroundColor: COLORS.primary,
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
});

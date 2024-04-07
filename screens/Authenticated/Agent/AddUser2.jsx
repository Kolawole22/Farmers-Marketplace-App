import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle } from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  ImageInput,
  LocationInput,
  StatePicker,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";
import { BACKEND_URL } from "../../../config.service";
import axios from "axios";

const AddUser2 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  //   const [loading, setLoading] = useState(false);
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
  const {
    setToastValues,
    toastValues,
    selectedState,
    selectedLocalGovt,
    userData,
  } = useContext(GlobalContext);

  useEffect(() => {
    console.log("User data:::", userData);
  }, []);

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
      // created_by: userData && userData.id,
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
        message: "No field can be empty",
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
            navigation.navigate("addUser3", { userId: res.data.id });
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: "Account registered. Please continue.",
            });
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
    <View style={[styles.layout]}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
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
              <Text style={styles.step}> Step 2/5</Text>
            </View>
            <Text
              style={{
                width: "100%",
                fontFamily: "montReg",
                color: COLORS.input,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Register as a farmer to sell beyond your locality
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              gap: 16,
            }}
            style={styles.scrollContainer}
          >
            <Input
              label="First Name"
              placeholder="Joy"
              value={values.first_name}
              onChangeText={(text) =>
                setValues({ ...values, first_name: text })
              }
            />
            <Input
              label="Last Name"
              placeholder="Ommowaye"
              value={values.last_name}
              onChangeText={(text) => setValues({ ...values, last_name: text })}
            />
            <Input
              label="Email Address"
              placeholder="mainjayti@gmail.com"
              value={values.email}
              onChangeText={(text) => setValues({ ...values, email: text })}
              type={"email-address"}
            />
            <Input
              label="Farm Name"
              placeholder="Harmony Greens"
              value={values.farm_name}
              onChangeText={(text) => setValues({ ...values, farm_name: text })}
            />

            <StatePicker label={"State"} nextLabel={"Local Government"} />

            <Input
              label="Farm address"
              type="default"
              placeholder="Enter Your Farm Address"
              value={values.farm_address}
              onChangeText={(text) =>
                setValues({ ...values, farm_address: text })
              }
            />

            {/* BUTTON COMPONENT */}
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
                  registerFarmer();
                  // setIsAuhtenticated(true);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddUser2;

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

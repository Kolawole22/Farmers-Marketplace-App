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
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle } from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  ImageInput,
  StatePicker,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List1 = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    farm_name: "",
    farm_address: "",
  });
  const { setToastValues, toastValues, selectedState, selectedLocalGovt } =
    useContext(GlobalContext);

  const saveFarmerDetails = async () => {
    const farmer_details = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone,
      farm_address: values.farm_address,
      farm_name: values.farm_name,
      local_govt: selectedLocalGovt,
    };

    if (
      values.email === "" ||
      values.farm_name === "" ||
      values.farm_address === "" ||
      values.first_name === "" ||
      values.last_name === "" ||
      values.phone === "" ||
      selectedLocalGovt === ""
    ) {
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "No field should be empty",
      });
      return;
    } else {
      AsyncStorage.setItem("farmer_details", JSON.stringify(farmer_details));
      navigation.navigate("list2");
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
            <Text style={styles.titleTxt}>List a product</Text>
          </View>
        </View>

        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.topView}>
            <Text style={styles.topTxt}>
              You can create a product list for a farmer, a unique code will be
              generated after submission, unique for the farmer.
            </Text>

            <View style={styles.stepView}>
              <Text style={styles.step}> Step 1/3</Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "montBold",
              marginHorizontal: 16,
              color: COLORS.input,
              fontSize: 18,
              marginBottom: 16,
            }}
          >
            Farmer's Details
          </Text>
          <ScrollView
            contentContainerStyle={{
              gap: 16,
            }}
            style={styles.scrollContainer}
          >
            <Input
              label="First Name"
              placeholder="Enter First Name"
              value={values.first_name}
              onChangeText={(text) =>
                setValues({ ...values, first_name: text })
              }
            />
            <Input
              label="Last Name"
              placeholder="Enter Last Name"
              value={values.last_name}
              onChangeText={(text) => setValues({ ...values, last_name: text })}
            />
            <Input
              label="Email"
              placeholder="Enter Email Address"
              type={"email-address"}
              value={values.email}
              onChangeText={(text) => setValues({ ...values, email: text })}
            />
            <Input
              label="Active Phone Number"
              placeholder="Enter Phone Number"
              type={"phone-pad"}
              value={values.phone}
              onChangeText={(text) => setValues({ ...values, phone: text })}
            />
            <StatePicker label={"State"} nextLabel={"Local Government"} />
            <Input
              label="Farm Name"
              placeholder="Enter Farm Name"
              value={values.farm_name}
              onChangeText={(text) => setValues({ ...values, farm_name: text })}
            />
            <Input
              label="Farm Address"
              placeholder="Enter Farm Address"
              value={values.farm_address}
              onChangeText={(text) => setValues({ ...values, farm_address: text })}
            />

            {/* BUTTON COMPONENT */}
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
                  saveFarmerDetails();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default List1;

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
    marginTop: 18,
  },
  step: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS.input,
  },
});

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
import Input, { LocationInput, SearchInput } from "../../components/Input";
import { TextInput } from "react-native";
import CategoryPills from "../../components/CategoryPills";
import { onPills } from "../../components/constants/slides";
import axios from "axios";
import { BACKEND_URL } from "../../config.service";
import { GlobalContext } from "../../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupBuyerCategories = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [pills, setPills] = useState(onPills);
  const [pillsLoading, setPillsLoading] = useState(false);

  const {
    setIsAuhtenticated,
    setToastValues,
    toastValues,
    saveUserData,
    saveUserToken,
    userType,
    buyerInterests,
  } = useContext(GlobalContext);


  const confirmInterests = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("user_id");

    const data = {
      interests: buyerInterests,
    };

    if (buyerInterests.length < 1) {
      setLoading(false);
      setToastValues({
        ...toastValues,
        show: true,
        type: "Error",
        message: "Please selsct an interest.",
      });
      return;
    } else {
      axios
        .patch(
          `${BACKEND_URL}/accounts/customer_registration/${userId}/update_interests/`,
          data
        )
        .then((res) => {
          console.log("buyer update interests response:::", res.data);
          if (res.status === 200 || res.status === 201) {
            setLoading(false);
            navigation.navigate("OwnYourAccount");
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: "Interests saved. Please continue",
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

  useEffect(() => {
    setPillsLoading(true);
    axios
      .get(`${BACKEND_URL}/accounts/interests`)
      .then((res) => {
        console.log("buyer interests", res.data);
        setPills(res.data);
        setPillsLoading(false);
      })
      .catch((err) => {
        setPillsLoading(false);
        if (err.response) {
          console.log("Error response data:", err.response.data);

          setToastValues({
            ...toastValues,
            show: true,
            type: "Error",
            message: err.response.data.error,
          });
        } else if (err.request) {
          console.log("No response received:", err.request);
          setToastValues({
            ...toastValues,
            show: true,
            type: "Error",
            // message: err.request.data.detail,
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
  }, []);

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
          <Text style={styles.headTxt}>Choose Interest</Text>
          <Text style={styles.stepTxt}>Step 2/3</Text>
          <Text style={styles.parag}>
            We are interested in what you like, choose your area of interest to
            get personalized recommendations
          </Text>
        </View>
        <ScrollView style={{}}>
          <View style={styles.container}>
            {/* form View */}
            <View style={styles.viewForm}>
              <SearchInput placeholder="e.g Poultry" />

              {pillsLoading ? (
                <View style={{ marginVertical: 16 }}>
                  <ActivityIndicator />
                </View>
              ) : (
                <View style={styles.pillView}>
                  {pills?.map((pill) => (
                    <CategoryPills
                      text={pill.name}
                      isSelected={pill.isSelected}
                      item={pill}
                    />
                  ))}
                </View>
              )}

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
                    confirmInterests();
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
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

export default SignupBuyerCategories;

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
    fontFamily: "montReg",
    marginBottom: 28,
    fontSize: 14,
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
  pillView: {
    width: "100%",
    flex: 1,
    paddingTop: 16,
    marginHorizontal: "auto",
    flexDirection: "row",
    gap: 18,
    flexWrap: "wrap",
  },
});

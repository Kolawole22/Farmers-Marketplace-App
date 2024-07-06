import {
  ActivityIndicator,
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SHADOWS } from "../../../components/constants";
import {
  Add,
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowDown2,
  ArrowLeft,
  Calendar,
  Call,
  CloseCircle,
  Edit,
  Location,
  Tag,
  WeightMeter,
} from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  EditableInput,
  ImageInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { Image } from "react-native";
import CalendarItem from "../../../components/CalendarItem";
import { GlobalContext } from "../../../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";
// import Filter from "../../../components/FIlter";

const SalesDetails = ({ data, navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const { setToastValues, toastValues, fetchSalesBuyer } =
    useContext(GlobalContext);
  const {
    companyName,
    category,
    images,
    productName,
    productPrice,
    measureOfUnit,
    availableQuantity,
    location,
    details,
    productId,
    farmerId,
    phone_number,
  } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCallPress = (phone_number) => {
    const phoneNumber = `tel:${phone_number}`;
    Linking.openURL(phoneNumber);
  };

  const navigateToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const navigateToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const expressInterest = async () => {
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      setLoading(true);
      if (quantity === "") {
        setLoading(false);
        setToastValues({
          ...toastValues,
          show: true,
          type: "Error",
          message: "You need to specify a quantity.",
        });
        return;
      } else if (Number(quantity) > Number(availableQuantity)) {
        setLoading(false);
        setToastValues({
          ...toastValues,
          show: true,
          type: "Error",
          message: "Your quantity cannot be more than available quantity.",
        });
        return;
      } else {
        const data = {
          quantity: quantity,
          farmer: farmerId,
        };
        axios
          .post(`${BACKEND_URL}/api/interest/${productId}/`, data, {
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
              message: "Your interest has been sent successfully.",
            });
            console.log(res.data);
            fetchSalesBuyer();
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      }
    }
  };

  console.log("sales images:::", images);

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
          <Text style={styles.titleTxt}> Sales Details</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 28,
          }}
          style={styles.scrollContainer}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "montBold",
              fontSize: 18,
              lineHeight: 32,
              color: COLORS.input,
            }}
          >
            {companyName}
          </Text>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "montSBold",
              lineHeight: 32,
              fontSize: 14,
              color: COLORS.accent,
              marginBottom: 4,
            }}
          >
            {category}
          </Text>

          <View
            style={{
              width: "100%",
              aspectRatio: 1.7,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: images[currentIndex]?.image,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>

          {/* NVIGATION BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 6,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={navigateToPreviousImage}>
              <ArrowCircleLeft2 size="24" color={COLORS.input} />
            </TouchableOpacity>

            <Text style={styles.profileLinkTxt}>{`${currentIndex + 1}/${
              images.length
            }`}</Text>

            <TouchableOpacity onPress={navigateToNextImage}>
              <ArrowCircleRight2 size="24" color={COLORS.input} />
            </TouchableOpacity>
          </View>

          {/* FRESH CATFISH, TITLE AND PRICE */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontFamily: "montBold",
                fontSize: 18,
                lineHeight: 32,
                color: COLORS.input,
              }}
            >
              {productName}
            </Text>

            <Text style={styles.profileLinkTxt}>
              {" "}
              <Text style={styles.strong}>{productPrice}</Text>/{measureOfUnit}
            </Text>
          </View>

          {/* INPUT QUANTITY  */}
          <View
            style={{
              backgroundColor: COLORS.accent10,
              ...SHADOWS.large,
              padding: 10,
              marginBottom: 30,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "montReg",
                fontSize: 8,
                color: COLORS["80%"],
              }}
            >
              Input Quantity
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <TextInput
                style={{
                  width: 44,
                  height: 28,
                  borderColor: COLORS.accent,
                  borderWidth: 0.5,
                  borderRadius: 4,
                  marginTop: 4,
                  backgroundColor: COLORS.white,
                  padding: 10,
                  fontFamily: "montSBold",
                  fontSize: 13,
                }}
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
              />
              <Text
                style={{
                  fontFamily: "montMid",
                  fontSize: 18,
                  color: COLORS["80%"],
                }}
              >
                /{availableQuantity}
                {measureOfUnit}
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.profileLink}>
              <Location color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>{location}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.profileLink}
              onPress={() => handleCallPress(phone_number)}
            >
              <Call color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>{phone_number}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.details}>Details</Text>
          <View style={styles.detailsView}>
            <Text style={styles.dvTxt}>{details}</Text>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              style={{
                // width: "100%",
                flex: 1,
                height: 48,
                marginHorizontal: 40,
                marginTop: 30,
                borderRadius: 6,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={expressInterest}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "montMid",
                  fontSize: 16,
                }}
              >
                Express Interest
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SalesDetails;

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
    flex: 1,
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
  profileLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
    height: 40,
  },
  profileLinkTxt: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS.input,
  },
  profileLinkTxt2: {
    fontFamily: "montReg",
    fontSize: 18,
    color: COLORS["80%"],
  },
  strong: {
    fontFamily: "montSBold",
  },
  details: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 8,
    marginBottom: 8,
  },
  detailsView: {
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.inputEdit,
  },
  dvTxt: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS["80%"],
  },
});

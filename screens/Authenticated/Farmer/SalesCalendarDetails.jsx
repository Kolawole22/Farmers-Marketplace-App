import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SHADOWS } from "../../../components/constants";
import {
  Add,
  ArrowCircleLeft2,
  ArrowCircleRight2,
  ArrowDown2,
  ArrowLeft,
  Calendar,
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
import moment from "moment";

const SalesCalendarDetails = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const routeData = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : routeData?.images.length - 1
    );
  };

  const navigateToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < routeData?.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  console.log("route params:::", routeData);

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
          <Text style={styles.titleTxt}>My Sales Calendar</Text>
          {/* <TouchableOpacity style={styles.flexCenter}>
            <Edit size="18" color={COLORS.white} />
          </TouchableOpacity> */}
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 28,
          }}
          style={styles.scrollContainer}
        >
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
                uri: routeData?.images[currentIndex]?.image,
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
              routeData?.images.length
            }`}</Text>

            <TouchableOpacity onPress={navigateToNextImage}>
              <ArrowCircleRight2 size="24" color={COLORS.input} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "montBold",
              fontSize: 18,
              lineHeight: 32,
              color: COLORS.input,
              marginTop: 20,
            }}
          >
            {routeData?.product_name}
          </Text>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "montMid",
              fontSize: 16,
              color: COLORS.primary1,
            }}
          >
            {routeData?.category.name}
          </Text>

          <View style={{ marginTop: 20 }}>
            <View style={styles.profileLink}>
              <Location color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                {routeData?.farmer.farm_address}
              </Text>
            </View>
            <View style={styles.profileLink}>
              <Tag color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                {" "}
                <Text style={styles.strong}>N{routeData?.price_per_unit}</Text>/
                {routeData?.unit_of_measurement}
              </Text>
            </View>
            <View style={styles.profileLink}>
              <WeightMeter color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                {" "}
                <Text style={styles.strong}>
                  {routeData?.available_quantity}{" "}
                </Text>
                {routeData?.unit_of_measurement} Available
              </Text>
            </View>
            <View style={styles.profileLink}>
              <Location color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                {moment(routeData?.sales_date_and_time).format(
                  "dddd, MMM D, YYYY"
                )}
              </Text>
            </View>
            <View style={styles.profileLink}>
              <Location color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                from {moment().format("hA")}
              </Text>
            </View>
          </View>

          <Text style={styles.details}>Details</Text>
          <View style={styles.detailsView}>
            <Text style={styles.dvTxt}>{routeData?.description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SalesCalendarDetails;

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
  strong: {
    fontFamily: "montSBold",
  },
  details: {
    fontFamily: "montReg",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 24,
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

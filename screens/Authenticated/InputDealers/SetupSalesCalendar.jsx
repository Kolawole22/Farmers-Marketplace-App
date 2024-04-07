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

const SetupSalesCalendar = ({ navigation, id }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.layout}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>Set Up Sales Calendar</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <Text style={styles.topTxt}>
            Lorem ipsum dolor sit amet consectetur. Sed velit nisl maecenas
            laoreet feugiat.
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          <Input label="Product Name" placeholder="Enter Product Name" />
          <DropInputRight
            label="Product Category"
            placeholder="Choose category"
            Icon={
              <TouchableOpacity>
                <ArrowDown2 variant="Bold" color={COLORS.input} />
              </TouchableOpacity>
            }
          />
          <TextAreaApp
            label="Write Description"
            placeholder="Choose category"
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <DropInputLeft
              label="Price/Unit"
              placeholder="0.00"
              Icon={
                <TouchableOpacity>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
            />
            <DropInputRight
              label="Unit of Measure"
              placeholder="KG"
              Icon={
                <TouchableOpacity>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
            />
          </View>

          <ImageInput
            label="Available Quantity"
            height={130}
            onPress={() => {
              launchImageLibrary();
            }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <ImageInput height={80} />
            <ImageInput height={80} />
            <ImageInput height={80} />
          </View>

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
                navigation.navigate("dashboard");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Sales Calendar</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SetupSalesCalendar;

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

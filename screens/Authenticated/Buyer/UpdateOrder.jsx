import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
// import Filter from "../../../components/FIlter";

const UpdateOrder = ({ data, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.layout}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}> Sales Details</Text>
        </View>
      </View>
      <View style={styles.timerView}>
        <Text style={styles.timerTxt}>8 days</Text>
        <Text style={styles.timerTxt}>16 hours</Text>
        <Text style={styles.timerTxt}>52 min</Text>
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
            HARMONY GREENS
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
            Fishery
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
                uri: "https://img.freepik.com/premium-photo/raw-catfish-cutting-board-cooking-fish_418821-1127.jpg?w=740",
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
            <TouchableOpacity>
              <ArrowCircleLeft2 size="24" color={COLORS.input} />
            </TouchableOpacity>

            <Text style={styles.profileLinkTxt}> 1/8 </Text>

            <TouchableOpacity>
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
              Fresh CatFish
            </Text>

            <Text style={styles.profileLinkTxt}>
              {" "}
              <Text style={styles.strong}>N1200</Text>/KG
            </Text>
          </View>

          {/* INPUT QUANTITY  */}

          {editing === true ? (
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
                  textContentType="password"
                  style={{
                    width: 44,
                    height: 28,
                    borderColor: COLORS.accent,
                    borderWidth: 0.5,
                    borderRadius: 4,
                    marginTop: 4,
                    backgroundColor: COLORS.white,
                    padding: 4,
                    fontFamily: "montSBold",
                    fontSize: 13,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "montMid",
                    fontSize: 18,
                    color: COLORS["80%"],
                  }}
                >
                  /300kg
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: COLORS.accent10,
                ...SHADOWS.large,
                padding: 10,
                marginBottom: 30,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "montReg",
                    fontSize: 8,
                    color: COLORS["80%"],
                  }}
                >
                  Quantity Ordered
                </Text>
                <Text
                  style={{
                    fontFamily: "montMid",
                    fontSize: 18,
                    color: COLORS["80%"],
                    lineHeight: 32,
                    marginTop: 4,
                  }}
                >
                  300kg
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setEditing(true);
                }}
              >
                <Edit variant="Broken" color={COLORS.input} />
              </TouchableOpacity>
            </View>
          )}

          <View>
            <View style={styles.profileLink}>
              <Location color={COLORS.input} size="16" />
              <Text style={styles.profileLinkTxt}>
                No. 8, Mountain street, Bomadi, Niger Delta
              </Text>
            </View>
          </View>

          <Text style={styles.details}>Details</Text>
          <View style={styles.detailsView}>
            <Text style={styles.dvTxt}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, voluptatem fuga, mollitia similique ipsum id eius
              accusamus, quaerat dolorum temporibus delectus nobis in.
            </Text>
          </View>

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
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "montMid",
                fontSize: 16,
              }}
            >
              Update Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UpdateOrder;

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
  timerView: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: COLORS.danger,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  timerTxt: {
    fontFamily: "space500",
    fontSize: 16,
    color: COLORS.danger,
  },
});

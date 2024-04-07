import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import {
  ArrowDown2,
  ArrowLeft,
  CloseCircle,
  FilterSearch,
  TickSquare,
} from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  EditableInput,
  EditableInputTransparent,
  EditableLocationInputTrans,
  ImageInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";
import {
  notifications,
  quickFilter,
} from "../../../components/constants/slides";
import NoteCardAgent from "../../../components/NoteCardAgent";
import Empty from "../../../components/Empty";
import All from "../../../components/All";
import InputDealersRequest from "../../../components/InputDealersRequest";
import FarmersRequest from "../../../components/FarmersRequest";
import BuyersRequest from "../../../components/BuyersRequest";

const UsersUnderMeDetails = ({ navigation, route }) => {
  const { allItemsSelected, setAllItemsSelected, setSelectApprovals } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const {
    name,
    user_type,
    farm_name,
    total_products,
    beneficiary,
    email,
    phone_number,
    city,
    state,
    local_govt,
    shop_address,
    photo,
  } = route.params;

  console.log(photo);

  return (
    <View style={[styles.layout]}>
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
          <Text style={styles.titleTxt}>User Details</Text>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{
                width: 100,
                height: 100,
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/images/userImg.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          )}
          {/* <Image
            source={{ uri: photo }}
            style={{
              width: 100,
              height: 100,
            }}
          /> */}
          <Text style={styles.topTxt}>{name}</Text>
          <Text style={styles.nxtTxt}>{user_type}</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <EditableInputTransparent label="Farm Name" value={farm_name} />
          <EditableInputTransparent
            label="Total Listed Products"
            value={total_products ? total_products : "--"}
          />
          <EditableInputTransparent
            label="LIFE-ND Beneficiary"
            value={beneficiary ? beneficiary : "--"}
          />
          <EditableInputTransparent label="Email" value={email} />
          <EditableInputTransparent
            label="Active Phone Number"
            value={phone_number ? phone_number : "--"}
          />
          <EditableInputTransparent label="City" value={city} />
          <EditableInputTransparent label="State" value={state} />
          <EditableLocationInputTrans
            label="Shop Address"
            value={shop_address}
          />
          <EditableInputTransparent
            label="Local Government"
            value={local_govt}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UsersUnderMeDetails;

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
    alignItems: "center",
  },
  topTxt: {
    fontFamily: "montBold",
    fontSize: 16,
    color: COLORS.input,
    marginTop: 12,
  },
  nxtTxt: {
    fontFamily: "montBold",
    fontSize: 14,
    color: COLORS.primary1,
    marginTop: 4,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 37,
  },
  button: {
    backgroundColor: COLORS.primary1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 44,
    flex: 1,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 44,
    flex: 1,
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
  tabContainer: {
    width: "100%",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  tabs: {
    width: "100%",
    height: 40,
    backgroundColor: COLORS.accent4,
    borderRadius: 8,
    flexDirection: "row",
  },
  tabItem: (active, item) => ({
    paddingHorizontal: 14,
    // flex:1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: active === item ? 2 : 0,
    borderColor: COLORS.primary1,
  }),
  tabItemText: (active, item) => ({
    color: COLORS.input,
    fontFamily: active === item ? "montBold" : "montReg",
    fontSize: active === item ? 14 : 12,
    textAlign: "center",
    color: active === item ? COLORS.primary1 : COLORS["80%"],
  }),
  fishFilter: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    marginTop: 8,
    alignItems: "center",
    gap: 8,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.8,
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    borderColor: COLORS.input10,
  },
  catTitleTxt: {
    color: COLORS.input,
    fontFamily: "montEBold",
    fontSize: 14,
  },
  viewAllTxt: {
    color: COLORS.input,
    fontFamily: "montMid",
    fontSize: 14,
  },
});

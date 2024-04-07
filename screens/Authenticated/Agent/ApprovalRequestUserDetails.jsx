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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../../../config.service";
import axios from "axios";

const ApprovalRequestUserDetails = ({ navigation, route }) => {
  const {
    allItemsSelected,
    setAllItemsSelected,
    setSelectApprovals,
    getAllUsers,
    toastValues,
    setToastValues,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);

  const getUserDetails = async () => {
    setLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");

    if (asyncToken !== null) {
      // console.log(`${BACKEND_URL}/accounts/user/${id}`, asyncToken);
      axios
        .get(`${BACKEND_URL}/accounts/user/${id}/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            setData(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("get user error:::", err.message);
          setLoading(false);
        });
    }
  };

  const approveUser = async () => {
    setApproveLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");

    if (asyncToken !== null) {
      // console.log(`${BACKEND_URL}/accounts/user/${id}`, asyncToken);
      axios
        .post(`${BACKEND_URL}/accounts/verify/user/${id}/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            getAllUsers();
            navigation.navigate("approvalRequests");
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: res.data.message,
            });
            setApproveLoading(false);
          }
        })
        .catch((err) => {
          console.log("get user error:::", err.message);
          setApproveLoading(false);
        });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={[styles.layout]}>
      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          <TouchableOpacity
            style={styles.flexCenter}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>User Details</Text>
          <TouchableOpacity style={styles.flexCenter}>
            <CloseCircle color={COLORS.white} variant="Bold" />
          </TouchableOpacity>
        </View>
      </View>
      {/* LOADER LOADER */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.topView}>
              <Image
                source={require("../../../assets/images/userImg2.png")}
                style={{
                  width: 123,
                  height: 123,
                }}
              />
              <Text style={styles.topTxt}>
                {data?.user_type === "Customer" ? "Buyer" : data?.user_type}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={approveUser}>
                  {approveLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.buttonText}>Approve</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDanger}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
              <EditableInputTransparent
                label="Name"
                value={`${data?.first_name} ${data?.last_name}`}
              />
              <EditableInputTransparent
                label="Business Name"
                value={data?.business_name}
              />
              <EditableInputTransparent
                label="LIFE-ND Beneficiary"
                value={data?.is_beneficiary ? "Yes" : "No"}
              />
              <EditableInputTransparent label="Email" value={data?.email} />
              <EditableInputTransparent
                label="Active Phone Number"
                value={data?.phone_number}
              />
              <EditableInputTransparent label="City" value={"Joy Funmilayo"} />
              <EditableInputTransparent label="State" value={"Joy Funmilayo"} />
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default ApprovalRequestUserDetails;

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
    fontSize: 24,
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

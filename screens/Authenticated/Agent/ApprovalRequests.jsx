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

const ApprovalRequests = ({ navigation }) => {
  const { allItemsSelected, setAllItemsSelected, setSelectApprovals } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

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
          <Text style={styles.titleTxt}>Approval Requests</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("history")}
            style={styles.flexCenter}
          >
            <Image
              source={require("../../../assets/images/history.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity> */}
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.tabContainer}>
          <View style={styles.tabs}>
            {quickFilter?.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActive(item.title)}
                style={styles.tabItem(active, item.title)}
              >
                <Text style={styles.tabItemText(active, (title = item.title))}>
                  {item.title}{" "}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ACTIVE SALES / FILTER */}
        <View style={styles.fishFilter}>
          {selected === true && (
            <TouchableOpacity
              onPress={() => {
                setSelected((prev) => (prev = false));
                setSelectApprovals((prev) => !prev);
              }}
              style={{
                flex: 1,
              }}
            >
              <CloseCircle color={COLORS.danger} size="22" variant="Bold" />
            </TouchableOpacity>
          )}

          {/* SELECT BUTTON */}
          {/* {selected === true ? (
            <TouchableOpacity
              onPress={() => setAllItemsSelected((prev) => !prev)}
              style={styles.filterBtn}
            >
              <Text style={styles.viewAllTxt}>
                {allItemsSelected === true ? "Unselect all" : "Select all"}
              </Text>

              <TickSquare
                size="14"
                color={
                  allItemsSelected === true ? COLORS.primary1 : COLORS.someGray
                }
                variant={allItemsSelected === true ? "Bold" : "TwoTone"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSelected((prev) => !prev);
                setSelectApprovals((prev) => !prev);
              }}
              style={styles.filterBtn}
            >
              <Text style={styles.viewAllTxt}>Select</Text>

              <TickSquare
                size="14"
                color={selected === true ? COLORS.primary1 : COLORS.someGray}
                variant={selected === true ? "Bold" : "TwoTone"}
              />
            </TouchableOpacity>
          )} */}

          {/* FILTER BUTTON */}
          {/* <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.viewAllTxt}>Filter</Text>
            <FilterSearch size="14" color={COLORS.input} />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          {active === "ALL" && <All navigation={navigation} />}
          {active === "FARMERS" && <FarmersRequest navigation={navigation} />}
          {active === "BUYERS" && <BuyersRequest navigation={navigation} />}
          {active === "INPUT DEALERS" && (
            <InputDealersRequest navigation={navigation} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ApprovalRequests;

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

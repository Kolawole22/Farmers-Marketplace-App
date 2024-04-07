import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS, SHADOWS } from "../../../components/constants";
import { SearchInput } from "../../../components/Input";
import Empty from "../../../components/Empty";
import { Image } from "react-native";
import ActiveProducts from "../../../components/ActiveProducts";
import {
  Add,
  FilterSearch,
  ProfileDelete,
  Refresh,
} from "iconsax-react-native";
import CompletedProducts from "../../../components/CompletedProducts";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import BuyerProductCard from "../../../components/BuyerProductCard";
import { products } from "../../../components/constants/slides";
import { GlobalContext } from "../../../context/context.service";

const { width, height } = Dimensions.get("window");

const SalesCalendar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Active");
  const { fetchSalesBuyer, buyerSalesLoading, buyerSalesList } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchSalesBuyer();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* TITLE ADN SEARCH BAR */}
        <View style={styles.titleSearch}>
          <Text style={styles.titleTxt}> Sales Calendar</Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("mySalesCalendarList");
          }}
          style={styles.tab}
        >
          <Text style={styles.tabTxt()}>View My List</Text>
        </TouchableOpacity> */}

        {/* ACTIVE SALES / FILTER */}
        <View style={styles.fishFilter}>
          <Text style={styles.catTitleTxt}>Active Sales</Text>
          {/* <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.viewAllTxt}>Filter</Text>
            <FilterSearch size="14" color={COLORS.input} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.filterView, {}]}
            onPress={fetchSalesBuyer}
          >
            <Refresh size="24" color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* <SafeAreaComponent> */}
        <SafeAreaComponent>
          {/* PRODUCT LISTINGS */}
          <View style={styles.productLists}>
            {buyerSalesLoading ? (
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <ActivityIndicator />
              </View>
            ) : buyerSalesList && buyerSalesList.length ? (
              buyerSalesList.map((product) => (
                <BuyerProductCard
                  key={product.id}
                  navigation={navigation}
                  product={product}
                />
              ))
            ) : (
              <Empty
                text="No Product Listed"
                subtext="You have no completed products"
              />
            )}
          </View>
        </SafeAreaComponent>
      </View>
    </View>
  );
};

export default SalesCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height: height,
  },
  safeContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  titleSearch: {
    alignItems: "center",
    marginTop: 64,
  },
  titleTxt: {
    marginTop: 16,
    fontFamily: "montSBold",
    color: COLORS.black,
    marginBottom: 7,
    fontSize: 24,
  },
  parag: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS.input,
    marginBottom: 16,
  },

  productLists: {
    flex: 1,
    width: "100%",
    gap: 24,
    // backgroundColor: "orange"
    marginBottom: 80,
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 38,
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
  tabTxt: (activeTab, tab) => ({
    fontFamily: "montBold",
    color: COLORS.primary,
    fontSize: 14,
  }),

  productCards: {
    flex: 1,
    width: "100%",
  },
  catTitleTxt: {
    color: COLORS.input,
    fontFamily: "montEBold",
    fontSize: 14,
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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
  viewAllTxt: {
    color: COLORS.input,
    fontFamily: "montMid",
    fontSize: 14,
  },
  fishFilter: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 28,
    alignItems: "center",
  },
});

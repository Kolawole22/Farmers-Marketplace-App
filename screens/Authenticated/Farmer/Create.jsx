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
import { products, tabs } from "../../../components/constants/slides";
import Empty from "../../../components/Empty";
import { Image } from "react-native";
import ActiveProducts from "../../../components/ActiveProducts";
import { Add, ProfileDelete, Refresh } from "iconsax-react-native";
import CompletedProducts from "../../../components/CompletedProducts";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../../context/context.service";

const { width, height } = Dimensions.get("window");

const Dashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Active");
  const [userData, setUserData] = useState();
  const { farmerActiveProducts, farmerProductsLoading, fetchFarmerProducts } =
    useContext(GlobalContext);
  const completedProducts =
    farmerActiveProducts &&
    farmerActiveProducts.filter((product) => !product.is_active);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");

      if (userData !== null) {
        setUserData(JSON.parse(userData));
      }
      console.log("Farm products in create:::", farmerActiveProducts);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("dynamicListProduct");
        }}
        style={{
          position: "absolute",
          bottom: 50,
          right: 16,
          backgroundColor: COLORS.accent,
          width: 64,
          height: 64,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          ...SHADOWS.medium,
        }}
      >
        <Add size="34" color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* TITLE ADN SEARCH BAR */}
        <View style={styles.titleSearch}>
          <Text style={styles.titleTxt}>{userData?.farm_name}</Text>
          <Text style={styles.parag}>
            Welcome to your dashboard{" "}
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: "montBold",
              }}
            >
              {userData?.first_name}
            </Text>
          </Text>
          {/* <SearchInput placeholder="Search your list" /> */}
        </View>
        <View style={styles.tabs}>
          {tabs?.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tab(activeTab, tab)}
            >
              <Text style={styles.tabTxt(activeTab, tab)}>{tab} Products</Text>
            </TouchableOpacity>
          ))}
        </View>
        <SafeAreaComponent>
          {/* <SafeAreaComponent> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={fetchFarmerProducts}>
              <Refresh size="24" color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* PRODUCT LISTINGS */}
          <View style={styles.productLists}>
            {farmerProductsLoading ? (
              <ActivityIndicator />
            ) : farmerActiveProducts && farmerActiveProducts.length < 1 ? (
              <>
                {activeTab === "Active" && (
                  <Empty
                    text="No Product Listed"
                    subtext="You have no active products"
                  />
                )}
                {activeTab === "Completed" && (
                  <Empty
                    text="No Product Listed"
                    subtext="You have no completed products"
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === "Active" && (
                  <ActiveProducts
                    navigation={navigation}
                    products={farmerActiveProducts && farmerActiveProducts}
                  />
                )}
                {activeTab === "Completed" && (
                  <CompletedProducts
                    navigation={navigation}
                    // products={completedProducts}
                  />
                )}
              </>
            )}
            {/* {farmerActiveProducts && farmerActiveProducts.length > 0 ? (
              <>
                {activeTab === "Active" && (
                  <ActiveProducts
                    navigation={navigation}
                    products={farmerActiveProducts && farmerActiveProducts}
                  />
                )}
                {activeTab === "Completed" && (
                  <CompletedProducts
                    navigation={navigation}
                    products={farmerActiveProducts && farmerActiveProducts}
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === "Active" && (
                  <Empty
                    text="No Product Listed"
                    subtext="You have no active products"
                  />
                )}
                {activeTab === "Completed" && (
                  <Empty
                    text="No Product Listed"
                    subtext="You have no completed products"
                  />
                )}
              </>
            )} */}
          </View>
        </SafeAreaComponent>
      </View>
    </View>
  );
};

export default Dashboard;

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
    marginBottom: 32,
    marginTop: 64,
  },
  titleTxt: {
    marginTop: 16,
    fontFamily: "montEBold",
    color: COLORS["80%"],
    marginBottom: 7,
    fontSize: 24,
    textAlign: "center",
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
    // backgroundColor: "orange"
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
  },
  tab: (activeTab, tab) => ({
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    borderBottomWidth: activeTab === tab ? 2 : 0.5,
    borderColor: activeTab === tab ? COLORS.primary : COLORS["80%"],
  }),
  tabTxt: (activeTab, tab) => ({
    fontFamily: activeTab === tab ? "montBold" : "montReg",
    color: activeTab === tab ? COLORS.primary : COLORS["80%"],
  }),

  productCards: {
    flex: 1,
    width: "100%",
  },
});

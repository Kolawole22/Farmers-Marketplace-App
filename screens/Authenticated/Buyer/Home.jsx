import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../components/constants";
import {
  ArrowDown2,
  Filter,
  FilterSearch,
  Refresh,
} from "iconsax-react-native";
import { products, quickLinks } from "../../../components/constants/slides";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import CategoryCard from "../../../components/CategoryCard";
import FilterPanel from "../../../components/Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../../context/context.service";

const QuickLink = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.title)}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: COLORS.accent,
          marginBottom: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 37,
            height: 37,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "montMid",
          fontSize: 14,
          color: COLORS.input,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [userData, setUserData] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { buyerProductsLoading, allBuyerProducts, fetchBuyerProducts } =
    useContext(GlobalContext);

  const handleCategorySelection = (itemTitle) => {
    setSelectedCategory(itemTitle);
  };

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");

      if (userData !== null) {
        setUserData(JSON.parse(userData));
        console.log("All buyer products:::", allBuyerProducts);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {openFilter && <FilterPanel />}

      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.life}>FARMERS MARKETPLACE APP</Text>
          <Text style={styles.introText}>
            For your benefit,{" "}
            <Text style={{ color: COLORS.accent3, fontFamily: "montEBold" }}>
              {userData?.first_name}{" "}
            </Text>
            we've made farm product purchases hassle-free
          </Text>
          <Text style={styles.introText}>Good Morning </Text>
        </View>
        <View style={styles.topRight}>
          <View style={styles.userImg}>
            <Image
              source={{ uri: userData?.photo_url }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        {/* CATEGORY AND FILTER */}
        <View style={styles.catFilter}>
          <Text style={styles.catTitleTxt}>Categories</Text>
          {/* <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllTxt}>View all</Text>
            <ArrowDown2 variant="Bold" size="18" color={COLORS.input} />
          </TouchableOpacity> */}
        </View>

        <View>
          <FlatList
            data={quickLinks}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <QuickLink item={item} onPress={handleCategorySelection} />
            )}
            contentContainerStyle={{
              gap: 16,
              marginTop: 16,
            }}
          />
        </View>

        {/* CATEGORY AND FILTER */}
        <View style={styles.fishFilter}>
          <Text style={styles.catTitleTxt}>Product List</Text>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => {
              fetchBuyerProducts();
              setSelectedCategory(null);
            }}
          >
            <Refresh size="24" color="#ccc" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.viewAllTxt}>Filter</Text>
            <FilterSearch size="14" color={COLORS.input} />
          </TouchableOpacity> */}
        </View>

        {/* LIST OF CARDS */}
        <SafeAreaComponent>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              {selectedCategory !== null && selectedCategory}
            </Text>
            <View style={styles.categoryCards}>
              {buyerProductsLoading ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : (
                <>
                  {allBuyerProducts &&
                    allBuyerProducts
                      ?.filter(
                        (item) =>
                          selectedCategory === null ||
                          item.category.name === selectedCategory
                      )
                      .map((item) => (
                        <CategoryCard
                          key={item.id}
                          data={item}
                          navigation={navigation}
                        />
                      ))}
                </>
              )}
            </View>
          </View>
        </SafeAreaComponent>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: 64,
  },
  top: {
    paddingHorizontal: 16,
  },
  userImgView: {
    width: 80,
    height: 80,
    boderRadius: 80,
    borderWidth: 1,
    borderColor: "",
  },
  life: {
    color: COLORS.white,
    fontFamily: "montEBold",
    fontSize: 14,
    marginBottom: 24,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 44,
    gap: 16,
  },
  topLeft: {
    flex: 1,
  },
  topRight: {},
  introText: {
    fontFamily: "montMid",
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },
  userImg: {
    width: 80,
    height: 80,
  },
  bottom: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  catFilter: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    marginTop: 40,
    alignItems: "center",
  },
  categoryCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
  },
});

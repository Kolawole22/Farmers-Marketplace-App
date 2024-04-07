import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SHADOWS } from "../../../components/constants";
import {
  ArrowDown2,
  Filter,
  FilterSearch,
  People,
  UserAdd,
  UserOctagon,
  User,
} from "iconsax-react-native";
import { products, quickLinks } from "../../../components/constants/slides";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import CategoryCard from "../../../components/CategoryCard";
import FilterPanel from "../../../components/Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../../context/context.service";

const QuickLink = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
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
  const [timeOfDay, setTimeOfDay] = useState("");
  const { isNotification } = useContext(GlobalContext);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay("morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setTimeOfDay("afternoon");
      } else {
        setTimeOfDay("evening");
      }
    };

    updateGreeting();

    // Update the greeting every minute (optional)
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const getGreetingMessage = () => {
    switch (timeOfDay) {
      case "morning":
        return "Good morning";
      case "afternoon":
        return "Good afternoon";
      case "evening":
        return "Good evening";
      default:
        return "Hello";
    }
  };

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");
      if (userData !== null) {
        setUserData(JSON.parse(userData));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {openFilter && <FilterPanel />}

      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.life}>Life_ND</Text>
          <Text style={styles.introText}>
            {getGreetingMessage()}{" "}
            <Text style={{ color: COLORS.primary1, fontFamily: "montEBold" }}>
              Agent {userData?.first_name}
            </Text>
          </Text>
        </View>
        <View style={styles.topRight}>
          <View style={styles.userImg}>
            {userData?.photo ? (
              <Image
                source={{ uri: userData?.photo }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
                resizeMode="contain"
              />
            ) : (
              <User size={25} color={COLORS.primary1} />
            )}
          </View>
        </View>
      </View>

      <SafeAreaComponent>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.firstView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("addUser1");
              }}
              style={styles.addUser}
            >
              <UserAdd color={COLORS.primary1} size="48" />
              <Text style={styles.labelText}>Add Users</Text>
            </TouchableOpacity>
            <View style={styles.products}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("list1");
                }}
                style={styles.listProduct}
              >
                <Image
                  source={require("../../../assets/images/create.png")}
                  style={{
                    width: 48,
                    height: 48,
                  }}
                />
                <Text style={styles.labelText}>List a Product</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.viewProductList}>
                <Image
                  source={require("../../../assets/images/listicon.png")}
                  style={{
                    width: 46,
                    height: 46,
                  }}
                />
                <Text style={styles.labelText}>View Product List</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.secondView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("approvalRequests");
              }}
              style={styles.approvalReq}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("notifications");
                }}
                style={{
                  position: "absolute",
                  top: 48,
                  right: 24,
                  height: 40,
                  width: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isNotification === true ? (
                  <Image
                    source={require("../../../assets/images/note.png")}
                    style={{
                      width: 26,
                      height: 26,
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/images/no-note.png")}
                    style={{
                      width: 26,
                      height: 26,
                    }}
                  />
                )}
              </TouchableOpacity>

              <UserOctagon color={COLORS.primary1} size="48" />
              <Text style={styles.labelText}>Approval Requests</Text>
            </TouchableOpacity>

            <View style={styles.userTrans}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("usersUnderMe");
                }}
                style={styles.usersUnder}
              >
                <People variant="TwoTone" color={COLORS.primary1} size="48" />
                <Text style={styles.labelText}>Users Under Me</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("agentTransactions");
                }}
                style={styles.transactions}
              >
                <Image
                  source={require("../../../assets/images/listicon.png")}
                  style={{
                    width: 46,
                    height: 46,
                  }}
                />
                <Text style={styles.labelText}>Transactions</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </SafeAreaComponent>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary10,
    paddingTop: 64,
  },
  top: {
    paddingHorizontal: 16,
  },
  userImgView: {
    width: 56,
    height: 56,
    boderRadius: 80,
    borderWidth: 1,
    borderColor: "",
  },
  life: {
    color: COLORS.input,
    fontFamily: "montEBold",
    fontSize: 14,
    marginBottom: 8,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  topLeft: {
    flex: 1,
  },
  topRight: {},
  introText: {
    fontFamily: "montMid",
    color: COLORS.input,
    fontSize: 14,
    marginBottom: 8,
  },
  userImg: {
    width: 56,
    height: 56,
    borderRadius: 100,
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
    marginTop: 40,
    alignItems: "center",
  },
  categoryCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  firstView: {
    width: "100%",
    height: 256,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addUser: {
    backgroundColor: COLORS.white,
    height: "100%",
    flex: 1,
    borderRadius: 16,
    ...SHADOWS.small,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  products: {
    flex: 1,
    gap: 8,
  },
  listProduct: {
    // height: "50%",
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    ...SHADOWS.small,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  viewProductList: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    ...SHADOWS.small,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondView: {
    gap: 8,
    marginTop: 24,
    marginBottom: 60,
  },
  approvalReq: {
    width: "100%",
    backgroundColor: COLORS.white,
    height: 216,
    borderRadius: 16,
    ...SHADOWS.small,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "relative",
  },
  userTrans: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  usersUnder: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 114,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  transactions: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 114,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  labelText: {
    color: COLORS["80%"],
    fontSize: 14,
    fontFamily: "montSBold",
  },

  secondView: {
    gap: 8,
    marginTop: 24,
    marginBottom: 60,
  },
  approvalReq: {
    width: "100%",
    backgroundColor: COLORS.white,
    height: 216,
    borderRadius: 16,
    ...SHADOWS.small,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  userTrans: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  usersUnder: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 114,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  transactions: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 114,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  labelText: {
    color: COLORS["80%"],
    fontSize: 14,
    fontFamily: "montSBold",
  },
});

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, Global, Refresh } from "iconsax-react-native";
import { notifications } from "../../../components/constants/slides";
import Empty from "../../../components/Empty";
import NoteCard from "../../../components/NoteCard";
import { GlobalContext } from "../../../context/context.service";

const Notification = () => {
  const {
    fetchFarmerInterestsOnPrroducts,
    farmerProductsInterestLoading,
    farmerInterestList,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchFarmerInterestsOnPrroducts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchFarmerInterestsOnPrroducts();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* TITLE HEADER */}
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>Notifications</Text>
        </View>

        {/* <TouchableOpacity style={styles.filterView}>
          <Text style={styles.filterTxt}>Filter By: Date</Text>
          <ArrowDown2 size="20" color={COLORS.black} variant="Bold" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.filterView, { marginTop: 20 }]}
          onPress={fetchFarmerInterestsOnPrroducts}
        >
          <Refresh size="24" color="#ccc" />
        </TouchableOpacity>

        <SafeAreaComponent>
          <View style={{ marginBottom: 80 }}>
            {farmerProductsInterestLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                {farmerInterestList.length > 0 ? (
                  farmerInterestList.map((item, idx) => (
                    <NoteCard data={item} key={idx} />
                  ))
                ) : (
                  <View style={{ flex: 1 }}>
                    <Empty
                      text="No Notifications"
                      subtext="Your notifications will show here"
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </SafeAreaComponent>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  titleView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 62,
    marginBottom: 24,
  },
  titleTxt: {
    fontFamily: "montSBold",
    fontSize: 24,
    color: COLORS.black,
  },
  filterView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  filterTxt: {
    fontFamily: "montMid",
    fontSize: 14,
    color: COLORS.filterGray,
  },
});

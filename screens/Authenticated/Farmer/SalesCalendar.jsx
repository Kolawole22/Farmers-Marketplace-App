import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SHADOWS } from "../../../components/constants";
import {
  Add,
  ArrowDown2,
  ArrowLeft,
  Calendar,
  CloseCircle,
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
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const SalesCalendar = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);

  const fetchSalesCalendarAction = async () => {
    setLoading(true);

    const asyncToken = await AsyncStorage.getItem("user_token");

    if (asyncToken !== null) {
      axios
        .get(`${BACKEND_URL}/api/sales-products/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          console.log("sales data:::", res.data);
          setSales(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchSalesCalendarAction();
  }, []);

  return (
    <View style={styles.layout}>
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
          <Text style={styles.titleTxt}>My Sales Calendar</Text>
          {/* <TouchableOpacity style={styles.flexCenter}>
            <Calendar variant="Bold" size="20" color={COLORS.white} />
          </TouchableOpacity> */}
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 28,
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          {sales.length > 0 && (
            <>
              {sales.map((sale) => (
                <CalendarItem
                  navigation={navigation}
                  status={sale.ongoing}
                  title={sale.description}
                  date={moment(sale.sales_date_and_time).format("dddd, MMM D")}
                  createdAt={moment(sale.createdAt).format("hh:mm a")}
                  location={sale.farmer.community}
                  salesDate={moment(sale.sales_date_and_time).format("hh:mm a")}
                  fullSaleDetails={sale}
                  key={sale.id}
                />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SalesCalendar;

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
});

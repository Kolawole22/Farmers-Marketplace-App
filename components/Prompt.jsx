import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "./constants";
import { GlobalContext } from "../context/context.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config.service";

const { width, height } = Dimensions.get("window");

const Prompt = () => {
  const {
    openModal,
    setOpenModal,
    modalTitle,
    modalSubTitle,
    modalAction,
    setIsAuhtenticated,
    setIsNewUser,
    setToastValues,
    toastValues,
    setFarmerActiveProducts,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  const deleteAccount = async () => {
    setLoading(true);
    const userToken = await AsyncStorage.getItem("user_token");

    if (userToken !== null) {
      console.log("token in delete:::", userToken);

      axios
        .delete(`${BACKEND_URL}/accounts/delete-user/`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          AsyncStorage.removeItem("user_id");
          AsyncStorage.removeItem("user_token");
          AsyncStorage.removeItem("user_data");
          setFarmerActiveProducts([]);
          setIsAuhtenticated(false);
          setIsNewUser(true);
          setOpenModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            console.log("Error response data:", err.response.data);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              message: err.response.data.error,
            });
          } else if (err.request) {
            console.log("No response received:", err.request);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              // message: err.request.data.detail,
            });
          } else {
            console.log("Request error:", err.message);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Error",
              message: err.message,
            });
          }
        });
    }
  };

  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: COLORS.blackTrans80,
        zIndex: 20,
        display: openModal === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          marginHorizontal: 16,
          paddingVertical: 50,
          paddingHorizontal: 16,
          backgroundColor: COLORS.white,
          borderRadius: 16,
        }}
      >
        <Text
          style={{ fontSize: 24, fontFamily: "montSBold", textAlign: "center" }}
        >
          {modalTitle}
        </Text>
        <Text
          style={{
            color: "#8795A1",
            fontSize: 16,
            fontFamily: "montReg",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {modalSubTitle}
        </Text>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 24,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={{
              borderWidth: 1,
              borderColor: "#00692B",
              paddingHorizontal: 41,
              paddingVertical: 16,
              borderRadius: 6,
              marginHorizontal: 8,
            }}
          >
            <Text>Go back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (modalTitle === "Delete Account") {
                deleteAccount();
              }
              if (modalTitle === "Log Out") {
                AsyncStorage.removeItem("user_token");
                AsyncStorage.removeItem("user_data");
                setFarmerActiveProducts([]);
                // const userType = AsyncStorage.getItem("user_type");
                // if (userType !== null) {
                //   if (userType === "Farmer") navigation;
                // }
                setIsAuhtenticated(false);
                setOpenModal(false);
              }
            }}
            style={{
              paddingHorizontal: 41,
              paddingVertical: 16,
              backgroundColor: "#D10000",
              borderRadius: 6,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ fontFamily: "montMid", color: "white" }}>
              {loading ? modalAction + "..." : modalAction}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Prompt;

const styles = StyleSheet.create({});

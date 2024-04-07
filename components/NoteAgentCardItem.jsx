import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "./constants";
import { TickSquare } from "iconsax-react-native";
import { GlobalContext } from "../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteAgentCardItem = ({ data, navigation }) => {
  const {
    allItemsSelected,
    selectApprovals,
    getAllUsers,
    toastValues,
    setToastValues,
  } = useContext(GlobalContext);

  const [newData, setNewData] = useState(data);
  const [approveLoading, setApproveLoading] = useState(false);

  const handleSelected = () => {
    setNewData({ ...newData, isSelected: !newData.isSelected });
  };

  useEffect(() => {
    if (allItemsSelected === true) {
      setNewData({ ...newData, isSelected: true });
    } else {
      setNewData({ ...newData, isSelected: false });
    }
  }, [allItemsSelected]);

  const approveUser = async () => {
    setApproveLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");

    if (asyncToken !== null) {
      // console.log(`${BACKEND_URL}/accounts/user/${id}`, asyncToken);
      axios
        .post(`${BACKEND_URL}/accounts/verify/user/${newData.id}/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            setToastValues({
              ...toastValues,
              show: true,
              type: "Success",
              message: res.data.message,
            });
            getAllUsers();
            setApproveLoading(false);
          }
        })
        .catch((err) => {
          console.log("get user error:::", err.message);
          setApproveLoading(false);
        });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("approvalRequestUserDetails", {
          id: newData.id,
        });
        // getUserDetails();
      }}
      style={{
        width: "100%",
        borderBottomWidth: 0.4,
        borderColor: COLORS.someGray,
        gap: 8,
        flexDirection: "row",
        padding: 8,
        paddingVertical: 14,
      }}
    >
      {/* SELECT BOX */}
      {selectApprovals === true && (
        <TouchableOpacity onPress={handleSelected} style={styles.filterBtn}>
          <TickSquare
            size="20"
            color={
              newData.isSelected === true ? COLORS.primary1 : COLORS.someGray
            }
            variant={newData.isSelected === true ? "Bold" : "TwoTone"}
          />
        </TouchableOpacity>
      )}

      {/* IMAGE VIEW */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 40,
          backgroundColor: COLORS.accent,
        }}
      >
        <Image
          source={require("../assets/images/userImg.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      {/* CONTENT VIEW */}
      <View
        style={{
          flex: 1,
          gap: 2,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "montReg",
              fontSize: 8,
              color: COLORS.someGray,
            }}
          >
            ORDER ID: 13414{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
              gap: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "montSBold",
                fontSize: 16,
                color: COLORS.input,
                lineHeight: 28,
              }}
            >
              {newData.first_name} {newData.last_name}
            </Text>
            <Text
              style={{
                fontFamily: "montBold",
                fontSize: 14,
                color: COLORS.accent,
              }}
            >
              {" "}
              .
            </Text>
            <Text
              style={{
                fontFamily: "montReg",
                fontSize: 14,
                color: COLORS.accent,
              }}
            >
              {" "}
              {newData.user_type === "Customer" ? "Buyer" : newData.user_type}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "montReg",
              fontSize: 12,
              color: COLORS.input,
            }}
          >
            {newData.email}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 8,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={approveUser}>
              {approveLoading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={{
                    fontFamily: "montSBold",
                    fontSize: 14,
                    color: COLORS.primary,
                  }}
                >
                  Approve
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "montSBold",
                  fontSize: 14,
                  color: COLORS.danger,
                }}
              >
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NoteAgentCardItem;

const styles = StyleSheet.create({});

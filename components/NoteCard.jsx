import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "./constants";
import moment from "moment/moment";
import axios from "axios";
import { BACKEND_URL } from "../config.service";
import { GlobalContext } from "../context/context.service";

const NoteCard = ({ data }) => {
  console.log("data in not card:::", data);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const { fetchFarmerProducts, fetchFarmerInterestsOnPrroducts } =
    useContext(GlobalContext);

  const acceptInterest = async () => {
    setAcceptLoading(true);

    axios
      .post(`${BACKEND_URL}/api/buyer-interest/${data.id}/accept/`)
      .then((res) => {
        console.log("accept data:::", res.data);
        fetchFarmerProducts();
        fetchFarmerInterestsOnPrroducts();
        setAcceptLoading(false);
      })
      .catch((err) => {
        console.log("accepy error:::", err.message);
        setAcceptLoading(false);
      });
  };

  const rejectInterest = async () => {
    setRejectLoading(true);

    axios
      .post(`${BACKEND_URL}/api/buyer-interest/${data.id}/reject/`)
      .then((res) => {
        console.log("accept data:::", res.data);
        fetchFarmerProducts();
        fetchFarmerInterestsOnPrroducts();
        setRejectLoading(false);
      })
      .catch((err) => {
        console.log("accepy error:::", err.message);
        setRejectLoading(false);
      });
  };

  const handleCallPress = (phone_number) => {
    const phoneNumber = `tel:${phone_number}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <View
        style={{
          width: "100%",
          borderBottomWidth: 0.4,
          borderColor: COLORS.input10,
          gap: 8,
          flexDirection: "row",
          padding: 8,
        }}
      >
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
            source={
              data?.buyer?.photo
                ? { uri: data?.buyer?.photo }
                : require("../assets/images/userImg.png")
            }
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
            }}
          />
        </View>

        {/* CONTENT VIEW */}
        <View
          style={{
            flex: 1,
            gap: 8,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
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
                {data?.buyer?.first_name} {data?.buyer?.last_name}
              </Text>
              <Text
                style={{
                  fontFamily: "montReg",
                  fontSize: 12,
                  color: COLORS.input,
                }}
              >
                {moment(data?.created_at).format("Do [of] MMM, YYYY. h:mm A")}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "montReg",
                fontSize: 12,
                color: COLORS.input,
              }}
            >
              {data?.buyer?.first_name} {data?.buyer?.last_name} wants to order{" "}
              {data?.quantity} {data?.product?.unit_of_measurement} of{" "}
              {data?.product?.product_name}{" "}
              {data?.product?.is_sales === true
                ? `from your sales calendar`
                : `from your regular calendar`}
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
              {data.status === "Accepted" ? (
                <Text>Accepted</Text>
              ) : data.status === "Rejected" ? (
                <Text>Rejected</Text>
              ) : (
                <>
                  {acceptLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <TouchableOpacity onPress={acceptInterest}>
                      <Text
                        style={{
                          fontFamily: "montSBold",
                          fontSize: 14,
                          color: COLORS.primary1,
                        }}
                      >
                        Accept
                      </Text>
                    </TouchableOpacity>
                  )}
                  {rejectLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <>
                      <TouchableOpacity onPress={rejectInterest}>
                        <Text
                          style={{
                            fontFamily: "montSBold",
                            fontSize: 14,
                            color: COLORS.danger,
                          }}
                        >
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.accent,
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 8,
              }}
              onPress={() => handleCallPress(data?.buyer?.phone_number)}
            >
              <Text
                style={{
                  fontFamily: "montReg",
                  fontSize: 8,
                  color: COLORS.white,
                }}
              >
                Contact buyer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({});

import {
  Image,
  Linking,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "./constants";
import { Copy } from "iconsax-react-native";
import moment from "moment";

const NoteCardBuyers = ({ data }) => {
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
                {data?.farmer?.farm_name}
              </Text>
              <Text
                style={{
                  fontFamily: "montReg",
                  fontSize: 12,
                  color: COLORS.input,
                }}
              >
                {moment(data.createdAt).format("hh:mm a")}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "montReg",
                fontSize: 12,
                color: COLORS.input,
              }}
            >
              Your interest on {data.quantity}{" "}
              {data.product.unit_of_measurement} of {data.product.product_name}{" "}
              {data.product.is_sales === true
                ? `from the sales calendar`
                : `from regular sales`}{" "}
              has been recieved and{" "}
              {data.status === "Accepted"
                ? `has been accepted`
                : data.status === "Pending"
                ? `is still pending`
                : data.status === "Rejected"
                ? `has been Rejected`
                : null}
            </Text>
          </View>

          {data.status === "Pending" || data.status === "Rejected" ? null : (
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
                {/* <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "montSBold",
                      fontSize: 8,
                      color: COLORS.primary1,
                    }}
                  >
                    Payment Unique Code:{" "}
                    <Text
                      style={{
                        fontFamily: "montSBold",
                        fontSize: 8,
                        color: COLORS.primary,
                        textDecorationLine: "underline",
                      }}
                    >
                      XY1256bTxx
                    </Text>
                  </Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity>
                  <Copy size="16" variant="Bold" color={COLORS.accent} />
                </TouchableOpacity> */}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.accent,
                  paddingVertical: 7,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                }}
                onPress={() => handleCallPress(data.farmer.phone_number)}
              >
                <Text
                  style={{
                    fontFamily: "montReg",
                    fontSize: 8,
                    color: COLORS.white,
                  }}
                >
                  Contact seller
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default NoteCardBuyers;

const styles = StyleSheet.create({});

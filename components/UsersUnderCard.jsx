import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "./constants";
import { Category, Location, TickSquare } from "iconsax-react-native";

const UsersUnderCard = ({ data, navigation }) => {
  const [selected, setSelected] = useState(false);
  const [newData, setNewData] = useState(data);

  // const handleSelected = ()

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("usersUnderMeDetails", {
            name: newData.first_name + " " + newData.last_name,
            user_type: newData.user_type,
            farm_name: newData.farm_name,
            email: newData.email,
            phone_number: newData.phone_number,
            city: newData.farm_address,
            state: newData.state,
            local_govt: newData.local_govt,
            shop_address: newData.farm_address,
            photo: newData.photo,
          })
        }
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
        {/* IMAGE VIEW */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 40,
            backgroundColor: COLORS.accent,
          }}
        >
          {newData.photo ? (
            <Image
              source={{ uri: newData.photo }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <Image
              source={require("../assets/images/userImg.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
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
                fontFamily: "montMid",
                fontSize: 12,
                color: COLORS.primary1,
              }}
            >
              {newData.user_type.toUpperCase()}
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
                  fontFamily: "montBold",
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
                {newData.farm_name}
              </Text>
            </View>

            {/* THE PART WHERE EACH ITEM IS LISTED FOR CATEGORY, LOCATION, LISTINGS */}

            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <Image
                source={require("../assets/images/listblack.png")}
                style={{
                  width: 12,
                  height: 15,
                }}
              />
              <Text
                style={{
                  fontFamily: "montReg",
                  fontSize: 12,
                  color: COLORS.input,
                }}
              >
                5 Listed Products
              </Text>
            </View> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <Location size="12" color={COLORS.input} />
              <Text
                style={{
                  fontFamily: "montReg",
                  fontSize: 12,
                  color: COLORS.input,
                }}
              >
                {newData.state} {newData.local_govt}
              </Text>
            </View>
          </View>

          {/* <View style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 4
                            }} >
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: 8,
                                    alignItems: "center",
                                }} >
                                    <TouchableOpacity>
                                        <Text style={{
                                            fontFamily: "montSBold",
                                            fontSize: 14,
                                            color: COLORS.primary
                                        }} >Approve</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily: "montSBold",
                                                fontSize: 14,
                                                color: COLORS.danger
                                            }}>Decline</Text>
                                    </TouchableOpacity>
                                </View>

                            </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UsersUnderCard;

const styles = StyleSheet.create({});

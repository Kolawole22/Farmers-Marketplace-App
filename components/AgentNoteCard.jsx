import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "./constants";

const AgentNoteCard = ({ data }) => {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {data &&
        data.notes &&
        data.notes.map((item, idx) => (
          <View
            key={idx}
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
                    Joy Omowaye
                  </Text>
                  <Text
                    style={{
                      fontFamily: "montReg",
                      fontSize: 12,
                      color: COLORS.input,
                    }}
                  >
                    9:09am
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "montReg",
                    fontSize: 12,
                    color: COLORS.input,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur sunt quae ipsum nemo. Modi, possimus!
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
                {item.isList === true && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.accent,
                      paddingVertical: 6,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "montReg",
                        fontSize: 12,
                        color: COLORS.white,
                      }}
                    >
                      View List
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default AgentNoteCard;

const styles = StyleSheet.create({});

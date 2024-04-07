import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "./constants";

const CalendarItem = ({
  status,
  navigation,
  date,
  title,
  location,
  createdAt,
  salesDate,
  fullSaleDetails,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.push("salesCalendarDetails", fullSaleDetails)}
      style={a.cardandLabel}
    >
      <Text style={a.date}>{date}</Text>

      <View style={a.card(status)}>
        <View style={a.cardTop}>
          <Text style={a.cardTopText}>{title}</Text>
          <Text style={a.cardTopText2}>{location}</Text>
        </View>
        <View style={a.cardBottom}>
          <Text style={a.cardBottomText}>{createdAt}</Text>
          <Text style={a.cardBottomText2}>{salesDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CalendarItem;

const a = StyleSheet.create({
  cardandLabel: {
    width: "100%",
  },
  date: {
    fontFamily: "montMid",
    fontSize: 14,
    color: COLORS.primary1,
    lineHeight: 34,
  },
  card: (status) => ({
    width: "100%",
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    borderLeftWidth: 3,
    paddingHorizontal: 8,
    borderColor: status === true ? COLORS.accent2 : COLORS.accent,
    borderRadius: 3,
  }),
  cardTop: {
    flex: 1,
  },
  cardTopText: {
    fontFamily: "montMid",
    fontSize: 16,
    color: COLORS.input,
    lineHeight: 32,
  },
  cardTopText2: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS.input,
    lineHeight: 32,
  },
  cardBottomText: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS.input,
    lineHeight: 32,
  },
  cardBottomText2: {
    fontFamily: "montReg",
    fontSize: 14,
    color: COLORS.input60,
    lineHeight: 32,
  },
});

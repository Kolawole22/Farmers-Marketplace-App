import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Add, TickCircle } from "iconsax-react-native";
import { COLORS } from "./constants";
import { GlobalContext } from "../context/context.service";

const CategoryPills = ({ text, item }) => {
  const [pill, setPill] = useState(item);
  const { buyerInterests, setBuyerInterets } = useContext(GlobalContext);

  const selectHandler = () => {
    if (!pill.isSelected) {
      setPill({ ...pill, isSelected: true });
      setBuyerInterets([...buyerInterests, item.id]);
    } else {
      setPill({ ...pill, isSelected: false });
      setBuyerInterets(buyerInterests.filter((id) => id !== item.id));
    }
  };

  //   console.log("pill item:::", item);

  return (
    <TouchableOpacity
      onPress={selectHandler}
      style={pill.isSelected === true ? styles.selectedPill : styles.pill}
    >
      <Text
        style={{
          fontFamily: "montMid",
          fontSize: 12,
          color: COLORS.input,
        }}
      >
        {text}
      </Text>
      {pill.isSelected === true ? (
        <TickCircle
          variant="Bold"
          style={{
            color: COLORS.primary,
          }}
          size="16"
        />
      ) : (
        <Add color={COLORS.primary} size="16" />
      )}
    </TouchableOpacity>
  );
};

export default CategoryPills;

const styles = StyleSheet.create({
  pill: {
    minWidth: "28%",
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 16,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  selectedPill: {
    minWidth: "28%",
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 16,
    flexDirection: "row",
    backgroundColor: COLORS.hiPill,
    borderColor: COLORS.hiPill,
  },
});

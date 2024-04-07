import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, SHADOWS } from "./constants";
import { Edit, RotateLeft, TimerStart } from "iconsax-react-native";
import moment from "moment/moment";

const BuyerProductCard = ({ product, navigation, id }) => {
  const [data, setData] = useState(product);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("salesDetails", {
          images: data?.images,
          companyName: data?.farmer?.farm_name,
          productName: data?.sub_category?.name,
          productPrice: data?.price_per_unit,
          measureOfUnit: data?.unit_of_measurement,
          availableQuantity: data?.available_quantity,
          location: data?.farmer?.farm_address,
          details: data?.description,
          category: data?.category?.name,
          productId: data?.id,
          farmerId: data?.farmer?.id,
          phone_number: data?.farmer?.phone_number,
        });
      }}
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
        ...SHADOWS.medium,
        shadowColor: COLORS.shadow,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          fontFamily: "montBold",
          fontSize: 14,
          color: COLORS.input,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {data?.farmer?.farm_name}
      </Text>

      {/* IMAGE */}
      <View
        style={{
          width: "100%",
          backgroundColor: "orange",
          //   height: 176,
          aspectRatio: 2.14,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          positions: "relative",
          //   overflow: "hidden"
        }}
      >
        <Image
          source={{ uri: data?.images[0].image }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
          }}
        />

        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.accent,
            alignItems: "center",
            justifyContent: "center",
            top: 10,
            right: 10,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 4,
            gap: 6,
          }}
        >
          <TimerStart size="20" color={COLORS.white} />
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "montMid",
              fontSize: 12,
            }}
          >
            {" "}
            {moment(data?.sales_date_and_time).format("Do MMMM")}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.primary1,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 4,
            minWidth: 112,
            left: 0,
            bottom: -10,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "montMid",
              fontSize: 16,
            }}
          >
            {data?.category.name}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          gap: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 14,
            color: COLORS.input,
          }}
        >
          {/* {data?.title} */}
        </Text>
        <Text
          style={{
            fontFamily: "montBold",
            fontSize: 14,
            color: COLORS.primary,
          }}
        >
          ₦{data?.price_per_unit}
          <Text
            style={{
              fontFamily: "montMid",
              fontSize: 14,
              color: COLORS.input,
            }}
          >
            /{data?.unit_of_measurement}
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 14,
            color: COLORS.input,
          }}
        >
          Q: <Text style={{}}>{data?.available_quantity}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BuyerProductCard;

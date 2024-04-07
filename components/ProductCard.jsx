import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SHADOWS } from "./constants";
import { Edit, RotateLeft } from "iconsax-react-native";

const ProductCard = ({ data, navigation, id }) => {
  console.log("date images:::", data.images[0]?.image);
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
        ...SHADOWS.medium,
        shadowColor: COLORS.shadow,
      }}
    >
      {/* IMAGE */}
      <View
        style={{
          width: "100%",
          //   height: 176,
          aspectRatio: 2.14,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          positions: "relative",
          //   overflow: "hidden"
        }}
      >
        {data.images[0] === undefined ? (
          <Text>
            Image Loading... Please use the refresh button if it's taking too
            long
          </Text>
        ) : (
          <Image
            source={{ uri: data.images[0]?.image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
            }}
          />
        )}

        {/* <TouchableOpacity
          onPress={() => {
            // navigation.navigate("dynamicListProduct");
          }}
          style={{
            position: "absolute",
            backgroundColor: COLORS.white,
            width: 44,
            height: 44,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            top: 10,
            right: 10,
          }}
        >
          <Edit
            style={{
              transform: [{ rotateY: "180deg" }],
            }}
            color={COLORS.icons}
          />
        </TouchableOpacity> */}

        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.primary,
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
            {data.category.name}
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
          {data.description}
        </Text>
        <Text
          style={{
            fontFamily: "montBold",
            fontSize: 14,
            color: COLORS.primary,
          }}
        >
          ₦{data.price_per_unit}
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
          Q: <Text style={{}}>{data.available_quantity}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;

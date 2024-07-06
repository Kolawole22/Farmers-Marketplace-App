import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SHADOWS } from "./constants";
import { Edit, Location } from "iconsax-react-native";

const CategoryCard = ({ data, navigation }) => {
  //console.log("di", data);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("productDetails", {
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
          phone_number: data.farmer?.phone_number,
        })
      }
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
        ...SHADOWS.medium,
        shadowColor: COLORS.shadow,
        width: "48%",
        marginBottom: 24,
      }}
    >
      {/* IMAGE */}
      <View
        style={{
          width: "100%",
          backgroundColor: "orange",
          height: 80,
          //   aspectRatio: 2.14,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          positions: "relative",
          //   overflow: "hidden"
        }}
      >
        <Image
          source={{ uri: data?.images[0]?.image }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
          }}
        />

        <View
          style={{
            position: "absolute",
            backgroundColor: COLORS.primary,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 4,
            minWidth: 65,
            left: 0,
            bottom: -10,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "montMid",
              fontSize: 12,
            }}
          >
            {data?.category?.name}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "montSBold",
            fontSize: 14,
            color: COLORS.input,
          }}
        >
          {data?.farmer?.farm_name?.toUpperCase()}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
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
          {data?.product_name}
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
        <View
          style={{
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Location size="14" color={COLORS.input} />
          <Text
            style={{
              fontFamily: "montReg",
              fontSize: 12,
              color: COLORS.input,
              maxWidth: 150,
            }}
          >
            {data?.farmer?.farm_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});

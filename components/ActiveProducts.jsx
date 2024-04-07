import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import ProductCard from "./ProductCard";

const ActiveProducts = ({ products, navigation }) => {
  const [items, setItems] = useState(products);

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
      }}
      style={{
        width: "100%",
        paddingHorizontal: 4,
        paddingBottom: 100,
        paddingTop: 10,
      }}
    >
      {items &&
        items.length &&
        items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            navigation={navigation}
            data={item}
          />
        ))}
    </ScrollView>
  );
};

export default ActiveProducts;

const styles = StyleSheet.create({});

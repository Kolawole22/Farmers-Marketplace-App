import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import ProductCard from "./ProductCard";

const CompletedProducts = ({ products, navigation }) => {
  const [items, setItems] = useState(products);

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
      }}
      style={{
        width: "100%",
        paddingHorizontal: 4,
      }}
    >
      {items &&
        items.length &&
        items.map((item) => (
          <ProductCard navigation={navigation} data={item} />
        ))}
    </ScrollView>
  );
};

export default CompletedProducts;

const styles = StyleSheet.create({});

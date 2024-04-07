import { StyleSheet, Text, View, ScrollView, Platform, SafeAreaView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeAreaComponent = ({ children, classes }) => {
  const insets = useSafeAreaInsets();
  return (
      <ScrollView
        style={[
          {
            paddingTop: Platform.OS === "android" ? insets.top + 20 : insets.top,
            height: "100%"
          },
          { ...classes },
        ]}
      >
        {children}
      </ScrollView>
  );
};

export default SafeAreaComponent;

const styles = StyleSheet.create({});

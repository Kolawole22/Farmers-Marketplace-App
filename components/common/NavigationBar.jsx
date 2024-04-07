import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import InactiveCreate from "../../assets/images/inactive-create.png";
import InactiveNotification from "../../assets/images/inactive-notification.png";
import InactiveProfile from "../../assets/images/inactive-profile.png";

const { width, height } = Dimensions.get("window");

const NavigationBar = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#103B1D",
        width: width,
        height: height * 0.1059,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={InactiveCreate} />
        </View>
        <Text style={{ fontFamily: "space400", color: "white", fontSize: 10 }}>
          Create
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={InactiveNotification} />
        </View>
        <Text style={{ fontFamily: "space400", color: "white", fontSize: 10 }}>
          Notification
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={InactiveProfile} />
        </View>
        <Text style={{ fontFamily: "space400", color: "white", fontSize: 10 }}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({});

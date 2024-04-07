import { StyleSheet, Text, View } from "react-native";

import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveHome from "../../../assets/images/active-home.png";
import ActiveNotification from "../../../assets/images/active-notification.png";
import ActiveProfile from "../../../assets/images/active-profile.png";
import InActiveProfile from "../../../assets/images/inactive-profile.png";
import InActiveNotification from "../../../assets/images/inactive-notification.png";
import InActiveHome from "../../../assets/images/inactive-home.png";
import InActiveCalendar from "../../../assets/images/inactive-calendar.png";
import activeCalendar from "../../../assets/images/active-calendar.png";

import Home from "./Home";
import Notifications from "./Notifications";
import Profile from "./Profile";
import SalesCalendar from "./SalesCalendar";
import { GlobalContext } from "../../../context/context.service";
import { Image } from "react-native";

// Screen names
const dashboardName = "Home";
const profileName = "Profile";
const notificationName = "Notification";
const salesCalendarname = "SalesCalendar";

const Tab = createBottomTabNavigator();

const BuyerDashboard = () => {
  const { fetchBuyerProducts } = useContext(GlobalContext);

  useEffect(() => {
    fetchBuyerProducts();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={dashboardName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === dashboardName) {
            iconName = focused ? ActiveHome : InActiveHome;
          } else if (rn === profileName) {
            iconName = focused ? ActiveProfile : InActiveProfile;
          } else if (rn === notificationName) {
            iconName = focused ? ActiveNotification : InActiveNotification;
          } else if (rn === salesCalendarname) {
            iconName = focused ? activeCalendar : InActiveCalendar;
          }

          return <Image source={iconName} />;
        },
        tabBarStyle: {
          backgroundColor: "#103B1D",
          paddingVertical: 8,
          borderWidth: 0,
        },
        tabBarLabelStyle: { color: "#fff" },
        headerShown: false,
      })}
    >
      <Tab.Screen name={dashboardName} component={Home} />
      <Tab.Screen name={notificationName} component={Notifications} />
      <Tab.Screen name={salesCalendarname} component={SalesCalendar} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
};

export default BuyerDashboard;

const styles = StyleSheet.create({
  container: {},
});

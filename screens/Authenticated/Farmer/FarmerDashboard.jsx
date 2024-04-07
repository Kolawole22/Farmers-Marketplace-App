import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveCreate from "../../../assets/images/active-create.png";
import ActiveNotification from "../../../assets/images/active-notification.png";
import ActiveProfile from "../../../assets/images/active-profile.png";
import InActiveProfile from "../../../assets/images/inactive-profile.png";
import InActiveNotification from "../../../assets/images/inactive-notification.png";
import InActiveCreate from "../../../assets/images/inactive-create.png";

// Screens
import Dashboard from "./Create";
import Profile from "./Profile";
import Notification from "./Notification";
import { Dimensions, Image } from "react-native";
import { GlobalContext } from "../../../context/context.service";
import axios from "axios";
import { BACKEND_URL } from "../../../config.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

// Screen names
const dashboardName = "Create";
const profileName = "Profile";
const notificationName = "Notification";

const Tab = createBottomTabNavigator();

const FarmerDashboard = () => {
  const { fetchFarmerProducts } = useContext(GlobalContext);

  useEffect(() => {
    fetchFarmerProducts();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={dashboardName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === dashboardName) {
            iconName = focused ? ActiveCreate : InActiveCreate;
          } else if (rn === profileName) {
            iconName = focused ? ActiveProfile : InActiveProfile;
          } else if (rn === notificationName) {
            iconName = focused ? ActiveNotification : InActiveNotification;
          }

          return <Image source={iconName} />;
        },
        tabBarStyle: {
          backgroundColor: "#103B1D",
          paddingTop: 8,
          borderWidth: 0,
          height: height * 0.1,
        },
        tabBarLabelStyle: { color: "#fff" },
        headerShown: false,
      })}
    >
      <Tab.Screen name={dashboardName} component={Dashboard} />
      <Tab.Screen name={notificationName} component={Notification} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
};

export default FarmerDashboard;

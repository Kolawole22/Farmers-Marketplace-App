import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/UnAuthenticated/Signup";
import Home from "./screens/Authenticated/Farmer/Home";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./screens/Onboarding/Onboarding";
import PostBoarding from "./screens/UnAuthenticated/PostBoarding";
import SignUpStep2 from "./screens/UnAuthenticated/SignUpStep2";
import VerifyIdentity from "./screens/UnAuthenticated/VerifyIdentity";
import { useContext } from "react";
import AwaitApproval from "./screens/UnAuthenticated/AwaitApproval";
import { useEffect, useState } from "react";
import Signin from "./screens/UnAuthenticated/Signin";
import SignupBuyer from "./screens/UnAuthenticated/SignupBuyer";
import ResetPassword from "./screens/UnAuthenticated/ResetPassword";
import EnterOTP from "./screens/UnAuthenticated/EnterOTP";
import CreateNewPassword from "./screens/UnAuthenticated/CreateNewPassword";
import SignupBuyerCategories from "./screens/UnAuthenticated/SignupBuyerCategories";
import OwnYourAccount from "./screens/UnAuthenticated/OwnYourAccount";
import SigninBuyer from "./screens/UnAuthenticated/SigninBuyer";
import ListProduct from "./screens/Authenticated/Farmer/ListProduct";
import AgentSignin from "./screens/UnAuthenticated/AgentSignin";
import Create from "./screens/Authenticated/Farmer/Create";
import CreateScreen from "./screens/Authenticated/InputDealers/Create";
import { GlobalContext } from "./context/context.service";
import CustomNotification from "./components/common/CustomNotification";
import DynamicListProduct from "./screens/Authenticated/Farmer/DynamicListProduct";
import DynamicListProductScreen from "./screens/Authenticated/InputDealers/DynamicListProduct";
import EditProfile from "./screens/Authenticated/Farmer/EditProfile";
import EditProfileScreen from "./screens/Authenticated/InputDealers/EditProfile";
import SalesCalendar from "./screens/Authenticated/Farmer/SalesCalendar";
import SalesCalendarScreen from "./screens/Authenticated/InputDealers/SalesCalendar";
import Settings from "./screens/Authenticated/Farmer/Settings";
import SettingsScreen from "./screens/Authenticated/InputDealers/Settings";
import ChangePassword from "./screens/Authenticated/Farmer/ChangePassword";
import ChangePasswordScreen from "./screens/Authenticated/InputDealers/ChangePassword";
import Profile from "./screens/Authenticated/Farmer/Profile";
import FarmerDashboard from "./screens/Authenticated/Farmer/FarmerDashboard";
import SalesCalendarDetails from "./screens/Authenticated/Farmer/SalesCalendarDetails";
import SalesCalendarDetailsScreen from "./screens/Authenticated/InputDealers/SalesCalendarDetails";
import SetupSalesCalendar from "./screens/Authenticated/Farmer/SetupSalesCalendar";
import SetupSalesCalendarScreen from "./screens/Authenticated/InputDealers/SetupSalesCalendar";
import InputDealerSignUp from "./screens/UnAuthenticated/InputDealer/InputDealerSignUp";
import InputDealerSignUp2 from "./screens/UnAuthenticated/InputDealer/InputDealerSignUp2";
import InputDealerCreateNewPassword from "./screens/UnAuthenticated/InputDealer/InputDealerCreateNewPassword";
import InputDealerSignIn from "./screens/UnAuthenticated/InputDealer/InputDealerSignIn";
import InputDealerHome from "./screens/Authenticated/InputDealers/Home";
import InputDealerDashboard from "./screens/Authenticated/InputDealers/InputDealerDashboard";
import { COLORS } from "./components/constants";
import BuyerDashboard from "./screens/Authenticated/Buyer/BuyerDashboard";
import ProductDetails from "./screens/Authenticated/Buyer/ProductDetails";
import EditBuyerProfile from "./screens/Authenticated/Buyer/EditBuyerProfile";
import SalesDetails from "./screens/Authenticated/Buyer/SalesDetails";
import MySalesCalendarList from "./screens/Authenticated/Buyer/MySalesCalendarList";
import UpdateOrder from "./screens/Authenticated/Buyer/UpdateOrder";
import AgentDashboard from "./screens/Authenticated/Agent/AgentDashboard";
import List1 from "./screens/Authenticated/Agent/List1";
import List2 from "./screens/Authenticated/Agent/List2";
import List3 from "./screens/Authenticated/Agent/List3";
import ListSuccess from "./screens/Authenticated/Agent/ListSuccess";
import ApprovalRequests from "./screens/Authenticated/Agent/ApprovalRequests";
import ApprovalRequestUserDetails from "./screens/Authenticated/Agent/ApprovalRequestUserDetails";
import History from "./screens/Authenticated/Agent/History";
import UsersUnderMe from "./screens/Authenticated/Agent/UsersUnderMe";
import UsersUnderMeDetails from "./screens/Authenticated/Agent/UsersUnderMeDetails";
import AddUser1 from "./screens/Authenticated/Agent/AddUser1";
import AddUser2 from "./screens/Authenticated/Agent/AddUser2";
import AddUser3 from "./screens/Authenticated/Agent/AddUser3";
import VerifyOTP from "./screens/Authenticated/Agent/VerifyOTP";
import VerifyID from "./screens/Authenticated/Agent/VerifyID";
import SetPassword from "./screens/Authenticated/Agent/SetPassword";
import Notifications from "./screens/Authenticated/Agent/Notifications";
import ProductList from "./screens/Authenticated/Agent/ProductList";
import EditAgentProfile from "./screens/Authenticated/Agent/EditAgentProfile";
import AgentTransactions from "./screens/Authenticated/Agent/AgentTransactions";
import AddBuyer1 from "./screens/Authenticated/Agent/AddBuyer1";
import AddBuyer2 from "./screens/Authenticated/Agent/AddBuyer2";
import AddBuyer3 from "./screens/Authenticated/Agent/AddBuyer3";

const Stack = createNativeStackNavigator();

const UnAuthenticatedScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* GENERAL */}
      <Stack.Screen name="PostBoarding" component={PostBoarding} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />

      {/* FOR FARMERS */}
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupStep2" component={SignUpStep2} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="VerifyIdentity" component={VerifyIdentity} />

      {/* FOR BUYERS */}
      <Stack.Screen name="SigninBuyer" component={SigninBuyer} />
      <Stack.Screen name="SignupBuyer" component={SignupBuyer} />
      <Stack.Screen
        name="SignupBuyerCategories"
        component={SignupBuyerCategories}
      />
      <Stack.Screen name="OwnYourAccount" component={OwnYourAccount} />

      {/* FOR AGENTS */}
      <Stack.Screen name="AgentSignin" component={AgentSignin} />

      {/* LOADERS */}
      <Stack.Screen name="AwaitApproval" component={AwaitApproval} />
      {/* <Stack.Screen name="listProduct" component={ListProduct} /> */}

      <Stack.Screen name="listProduct" component={ListProduct} />

      {/* Input Dealers */}
      <Stack.Screen name="InputDealerSignUp" component={InputDealerSignUp} />
      <Stack.Screen name="InputDealerSignUp2" component={InputDealerSignUp2} />
      <Stack.Screen name="InputDealerSignIn" component={InputDealerSignIn} />
      <Stack.Screen
        name="InputDealerCreateNewPassword"
        component={InputDealerCreateNewPassword}
      />
    </Stack.Navigator>
  );
};

// Farmer Authenticated Stack
const AuthenticatedScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="farmDashboard" component={FarmerDashboard} />
      <Stack.Screen name="dashboard" component={Create} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="dynamicListProduct" component={DynamicListProduct} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="salesCalendar" component={SalesCalendar} />
      <Stack.Screen
        name="salesCalendarDetails"
        component={SalesCalendarDetails}
      />
      <Stack.Screen name="setupSalesCalendar" component={SetupSalesCalendar} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

const BuyerScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="buyerDashboard" component={BuyerDashboard} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
      <Stack.Screen name="salesDetails" component={SalesDetails} />
      <Stack.Screen
        name="mySalesCalendarList"
        component={MySalesCalendarList}
      />
      <Stack.Screen name="updateOrder" component={UpdateOrder} />
      <Stack.Screen name="editBuyerProfile" component={EditBuyerProfile} />
    </Stack.Navigator>
  );
};

// AGENT AUTHENTICATED STACK
const AgentScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="agentDashboard" component={AgentDashboard} />
      <Stack.Screen name="list1" component={List1} />
      <Stack.Screen name="list2" component={List2} />
      <Stack.Screen name="list3" component={List3} />
      <Stack.Screen name="listSuccess" component={ListSuccess} />
      <Stack.Screen name="usersUnderMe" component={UsersUnderMe} />
      <Stack.Screen
        name="usersUnderMeDetails"
        component={UsersUnderMeDetails}
      />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen
        name="approvalRequestUserDetails"
        component={ApprovalRequestUserDetails}
      />
      <Stack.Screen name="approvalRequests" component={ApprovalRequests} />
      <Stack.Screen name="verifyID" component={VerifyID} />
      <Stack.Screen name="setPassword" component={SetPassword} />
      <Stack.Screen name="verifyOTP" component={VerifyOTP} />
      <Stack.Screen name="addUser3" component={AddUser3} />
      <Stack.Screen name="addUser2" component={AddUser2} />
      <Stack.Screen name="addUser1" component={AddUser1} />
      <Stack.Screen name="addBuyer1" component={AddBuyer1} />
      <Stack.Screen name="addBuyer2" component={AddBuyer2} />
      <Stack.Screen name="addBuyer3" component={AddBuyer3} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="productList" component={ProductList} />
      <Stack.Screen name="editAgentProfile" component={EditAgentProfile} />
      <Stack.Screen name="agentTransactions" component={AgentTransactions} />
    </Stack.Navigator>
  );
};

// Input Dealer Authenticated Stack
const InputDealerScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="InputDealerHome" component={InputDealerHome} /> */}
      <Stack.Screen
        name="InputDealerDashboard"
        component={InputDealerDashboard}
      />
      <Stack.Screen
        name="dynamicListProduct"
        component={DynamicListProductScreen}
      />
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
      <Stack.Screen name="salesCalendar" component={SalesCalendarScreen} />
      <Stack.Screen
        name="salesCalendarDetails"
        component={SalesCalendarDetailsScreen}
      />
      <Stack.Screen
        name="setupSalesCalendar"
        component={SetupSalesCalendarScreen}
      />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

const OnboardingScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="PostBoarding" component={PostBoarding} />

      {/* Farmers REG Flow */}
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="SignupStep2" component={SignUpStep2} />
      <Stack.Screen name="VerifyIdentity" component={VerifyIdentity} />
      <Stack.Screen name="AwaitApproval" component={AwaitApproval} />

      <Stack.Screen name="listProduct" component={ListProduct} />

      {/* Buyers REG Flow */}
      <Stack.Screen name="SignupBuyer" component={SignupBuyer} />
      <Stack.Screen name="SigninBuyer" component={SigninBuyer} />
      <Stack.Screen
        name="SignupBuyerCategories"
        component={SignupBuyerCategories}
      />
      <Stack.Screen name="OwnYourAccount" component={OwnYourAccount} />

      {/* Agents REG Flow */}
      <Stack.Screen name="AgentSignin" component={AgentSignin} />

      {/* Input Dealers */}
      <Stack.Screen name="InputDealerSignUp" component={InputDealerSignUp} />
      <Stack.Screen name="InputDealerSignUp2" component={InputDealerSignUp2} />
      <Stack.Screen name="InputDealerSignIn" component={InputDealerSignIn} />
      <Stack.Screen
        name="InputDealerCreateNewPassword"
        component={InputDealerCreateNewPassword}
      />
    </Stack.Navigator>
  );
};

export default Navigation = () => {
  const { isNewUser, isAuthenticated, userType } = useContext(GlobalContext);

  useEffect(() => {
    console.log("user type in navigation:::", userType);
  }, [userType]);

  return (
    <NavigationContainer>
      {isNewUser ? (
        <OnboardingScreens />
      ) : isAuthenticated ? (
        <>
          {userType === "Farmer" ? (
            <AuthenticatedScreens />
          ) : userType === "Input Dealer" ? (
            <InputDealerScreens />
          ) : userType === "Buyer" ? (
            <BuyerScreens />
          ) : userType === "Agent" ? (
            <AgentScreens />
          ) : null}
        </>
      ) : (
        <UnAuthenticatedScreens />
      )}
      {/* <UnAuthenticatedScreens /> */}
      {/* <AuthenticatedScreens /> */}
    </NavigationContainer>
  );
};

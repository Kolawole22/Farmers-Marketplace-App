import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../components/constants";
import { Timer } from "iconsax-react-native";
import { GlobalContext } from "../../context/context.service";

const AwaitApproval = ({ navigation }) => {
  const [isApproved, setIsApproved] = useState(false);
  const { userType } = useContext(GlobalContext);

  setTimeout(() => {
    setIsApproved(true);
  }, 3000);

  useEffect(() => {
    if (isApproved === true) {
      if (userType === "Buyer") {
        navigation.navigate("SigninBuyer");
      } else if (userType === "Farmer") {
        navigation.navigate("Signin");
      } else if (userType === "Input Dealer") {
        navigation.navigate("InputDealerSignIn");
      }
    }
  }, [isApproved]);

  return (
    <ImageBackground
      source={require("../../assets/images/approvebg.png")}
      style={styles.imgBg}
      resizeMode="contain"
    >
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.iconView}>
            <Timer size="44" color={COLORS.white} />
          </View>
          <View style={styles.contentView}>
            <Text style={styles.title}>Approval Pending</Text>
            <Text style={styles.parag}>
              You have successfully submited your details, approval can take{" "}
              <Text style={{ fontFamily: "space500" }}> 10-24 hours </Text> , we
              will send a notification once your profile has been approved
            </Text>
            <Text style={styles.parag}>
              Kindly check your mail or registered number for your log in
              details
            </Text>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>Contact Support</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>Speak to a Representative</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AwaitApproval;

const styles = StyleSheet.create({
  imgBg: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  safeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  iconView: {},
  contentView: {
    gap: 16,
    textAlign: "center",
  },
  title: {
    fontFamily: "space500",
    fontSize: 24,
    textAlign: "center",
    color: COLORS.white,
  },
  parag: {
    fontFamily: "space200",
    fontSize: 16,
    textAlign: "center",
    color: COLORS.white,
  },
  buttonsView: {
    alignItems: "stretch",
    gap: 16,
    width: "100%",
  },
  btn: {
    backgroundColor: COLORS.white,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  btnTxt: {
    fontFamily: "montMid",
    color: COLORS.primary,
    fontSize: 16,
  },
});

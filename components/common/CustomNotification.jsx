import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context.service";
import CloseSquare from "../../assets/images/close-square.png";
import { COLORS } from "../constants";

const { width, height } = Dimensions.get("window");

const CustomNotification = ({ message, onClose, type }) => {
  const { toastValues, setToastValues } = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (toastValues.show) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toastValues.show]);

  const hideNotification = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setToastValues({ ...toastValues, show: false });
    });
  };

  useEffect(() => {
    if (toastValues.show) {
      setTimeout(() => {
        hideNotification();
      }, 5000);
    }
  }, [toastValues.show]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return visible ? (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 60,
        width: width,
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor:
              toastValues.type === "Success" ? "#36BB2A" : "#ff3333",
            // width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 34,
          },
          { transform: [{ translateY }] },
        ]}
      >
        <Text style={{ color: "white", fontFamily: "montSBold" }}>
          {toastValues.message}
        </Text>
        <TouchableOpacity onPress={hideNotification}>
          <Image source={CloseSquare} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null;
};

export default CustomNotification;

const styles = StyleSheet.create({});

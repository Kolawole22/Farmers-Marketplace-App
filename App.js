import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { GlobalProvider } from "./context/context.service";
import CustomNotification from "./components/common/CustomNotification";
import { COLORS } from "./components/constants";
import Prompt from "./components/Prompt";
import ListProduct from "./screens/Authenticated/Farmer/ListProduct";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadCustomFonts() {
      await Font.loadAsync({
        // SPACE GROTESK FONT FAMILY
        space100: require("./assets/fonts/SpaceGrotesk-Light.ttf"),
        space200: require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
        space300: require("./assets/fonts/SpaceGrotesk-Medium.ttf"),
        space400: require("./assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        space500: require("./assets/fonts/SpaceGrotesk-Bold.ttf"),
        // MONTSERRAT FONT FAMILY
        montBlack: require("./assets/fonts/montserrat/Montserrat-Black.ttf"),
        montEBold: require("./assets/fonts/montserrat/Montserrat-ExtraBold.ttf"),
        montBold: require("./assets/fonts/montserrat/Montserrat-Bold.ttf"),
        montSBold: require("./assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
        montMid: require("./assets/fonts/montserrat/Montserrat-Medium.ttf"),
        montReg: require("./assets/fonts/montserrat/Montserrat-Regular.ttf"),
        montLight: require("./assets/fonts/montserrat/Montserrat-Light.ttf"),
        montELight: require("./assets/fonts/montserrat/Montserrat-ExtraLight.ttf"),
        montThin: require("./assets/fonts/montserrat/Montserrat-Thin.ttf"),
        // Montserrat- Black.ttf
      });
      setFontLoaded(true);
    }

    loadCustomFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <StatusBar style="auto" />
      <Navigation />
      <View
        style={{
          position: "absolute",
        }}
      >
        <CustomNotification />
      </View>

      <View
        style={{
          position: "absolute",
        }}
      >
        <Prompt />
      </View>

      <View
        style={{
          position: "absolute",
        }}
      >
        <ListProduct />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
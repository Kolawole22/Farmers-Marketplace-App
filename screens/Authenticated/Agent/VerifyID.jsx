import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrowDown2, Eye, EyeSlash } from "iconsax-react-native";
import { COLORS, SIZES } from "../../../components/constants";
import { StyleSheet } from "react-native";
import Input, { LocationInput } from "../../../components/Input";
import { TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";

const VerifyID = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const { toastValues, setToastValues } = useContext(GlobalContext);
  const { userId } = route.params;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleSnap = async () => {
    if (isCameraReady && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Captured Photo:", photo);
        setImage(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.warn("Camera is not ready yet. Wait for onCameraReady callback.");
    }
  };

  const loaderCountDown = () => {
    if (image) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate("CreateNewPassword");
        setToastValues({
          ...toastValues,
          show: true,
          type: "Success",
          message: "Your Face Identity has been captured!",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    loaderCountDown();
  }, [image]);

  if (hasCameraPermission === false) return <Text>No Access to camera</Text>;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.register}>
          {/* HEADER TXT */}
          <Text style={styles.headTxt}>Verify your Identity</Text>
          <Text style={styles.stepTxt}>Step 4/5</Text>
          <Text style={styles.parag}>
            Position your face in the circle below
          </Text>
        </View>

        {image !== null ? (
          <View style={styles.circle}>
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: 1,
                borderRadius: 300,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              aspectRatio: 1,
            }}
          >
            <Camera
              style={{
                width: 300,
              }}
              type={Camera.Constants.Type.front}
              ref={cameraRef}
              onCameraReady={handleCameraReady}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("setPassword", { userId: userId })}
          style={styles.snap}
        >
          <View style={styles.snapDot}></View>
        </TouchableOpacity>

        {loading && <Loader />}
      </View>
    </View>
  );
};

export default VerifyID;

const styles = StyleSheet.create({
  register: {
    marginTop: 100,
    alignItems: "center",
  },

  safeContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    paddingTop: 4,
    width: "100%",
  },
  headTxt: {
    fontSize: 28,
    color: COLORS.white,
    fontFamily: "space500",
    marginBottom: 12,
  },
  stepTxt: {
    fontSize: 16,
    fontFamily: "space200",
    color: COLORS.white,
    marginBottom: 12,
  },
  parag: {
    paddingHorizontal: 16,
    width: "100%",
    textAlign: "center",
    fontFamily: "space200",
    marginBottom: 72,
    color: COLORS.white,
  },
  viewForm: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginVertical: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 48,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "space400",
    fontSize: SIZES.normal,
  },
  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    marginTop: 10,
    marginBottom: 40,
  },
  dash: {
    width: 52,
    height: 2,
    backgroundColor: COLORS.black,
  },
  dividerText: {
    fontFamily: "space200",
    fontSize: SIZES.normal,
  },
  signInOptions: {
    width: "100%",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  signInOptionsImage: {
    width: 30,
    height: 30,
  },
  callToAction: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 2,
  },
  callQuestion: {
    fontFamily: "space200",
    fontSize: 12,
    color: COLORS.textGrayLight,
  },
  callAction: {
    fontFamily: "space200",
    fontSize: 12,
    color: COLORS.primary,
  },
  circle: {
    width: "60%",
    borderWidth: 1,
    borderColor: COLORS.white,
    alignSelf: "center",
    aspectRatio: 1,
    borderRadius: 300,
    color: COLORS.whiteTrans,
  },
  snap: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "#D9D9D9",
    marginBottom: 30,
  },
  snapDot: {
    height: 80,
    width: 80,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: COLORS.white,
  },
  cameraView: {
    position: "absolute",
    width: "100%",
    // height: "100%",
  },
});

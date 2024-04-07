import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle } from "iconsax-react-native";
import Input, {
  DropInputLeft,
  DropInputRight,
  ImageInput,
  TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";

const ListProduct = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { setIsAuhtenticated, listProductModal, setListProductModal } =
    useContext(GlobalContext);
  const translateY = useRef(new Animated.Value(1000)).current;
  const [visible, setVisisble] = useState(false);

  useEffect(() => {
    if (listProductModal) {
      setVisisble(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [listProductModal]);

  const hideProductModal = () => {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setVisisble(false);
      setListProductModal(false);
    });
  };

  return visible ? (
    <Animated.View style={[styles.layout, { transform: [{ translateY }] }]}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}

      <View style={styles.topBar}>
        <View style={styles.topBarItems}>
          {/* <TouchableOpacity style={styles.flexCenter}>
            <ArrowLeft color={COLORS.white} />
          </TouchableOpacity> */}
          <Text style={styles.titleTxt}>List your first product</Text>
          <TouchableOpacity
            style={styles.flexCenter}
            onPress={hideProductModal}
          >
            <CloseCircle color={COLORS.white} variant="Bold" size="22" />
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topView}>
          <Text style={styles.topTxt}>
            Lorem ipsum dolor sit amet consectetur. Sed velit nisl maecenas
            laoreet feugiat.
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          style={styles.scrollContainer}
        >
          <Input label="Product Name" placeholder="Enter Product Name" />
          <DropInputRight
            label="Product Category"
            placeholder="Choose category"
            Icon={
              <TouchableOpacity>
                <ArrowDown2 variant="Bold" color={COLORS.input} />
              </TouchableOpacity>
            }
          />
          <TextAreaApp
            label="Write Description"
            placeholder="Choose category"
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <DropInputLeft
              label="Price/Unit"
              placeholder="0.00"
              Icon={
                <TouchableOpacity>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
            />
            <DropInputRight
              label="Unit of Measure"
              placeholder="KG"
              Icon={
                <TouchableOpacity>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
            />
          </View>

          <ImageInput
            label="Available Quantity"
            height={130}
            onPress={() => {
              launchImageLibrary();
            }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <ImageInput height={80} />
            <ImageInput height={80} />
            <ImageInput height={80} />
          </View>

          {/* BUTTON COMPONENT */}
          {loading === true ? (
            <View
              style={{
                width: "100%",
                height: 40,
                marginVertical: 20,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("farmDashboard");
                // setIsAuhtenticated(true);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  ) : null;
};

export default ListProduct;

const styles = StyleSheet.create({
  layout: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  topBar: {
    height: 95,
    backgroundColor: COLORS.primary,
    justifyContent: "flex-end",
    width: "100%",
  },
  topBarItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  titleTxt: {
    fontFamily: "space500",
    color: COLORS.white,
    fontSize: 24,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  // OTHER STYLES BEGIN HERE
  safeContainer: {
    paddingHorizontal: 16,
    flex: 1,
    width: "100%",
  },
  topView: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 24,
  },
  topTxt: {
    fontFamily: "space300",
    fontSize: 14,
    color: COLORS.input,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 48,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "montMid",
    fontSize: 16,
  },
});

import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import useSocket from "../../../context/socket.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { BACKEND_URL } from "../../../config.service";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

const DynamicListProduct = ({ navigation, id }) => {
  const [loading, setLoading] = useState(false);
  const {
    setIsAuhtenticated,
    listProductModal,
    setListProductModal,
    listProductImgs,
    setListProductImgs,
    fetchFarmerProducts,
    setToastValues,
    toastValues,
  } = useContext(GlobalContext);
  const translateY = useRef(new Animated.Value(1000)).current;
  const [visible, setVisisble] = useState(false);
  const [categories, setCategories] = useState();
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [subCategoryDropDown, setSubCategoryDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [subCategories, setSubCategories] = useState();
  const { handleSocketConnection, sendMessage } = useSocket();
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [userData, setUserData] = useState();
  const [messageLoading, setMessageLoading] = useState(false);
  const [base64, setBase64] = useState("");
  const [base64Two, setBase64Two] = useState("");
  const [base64Three, setBase64Three] = useState("");
  const [base64Four, setBase64Four] = useState("");
  const [image, setImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");
  const [measuresModal, setMeasuresModal] = useState(false);
  const [kg, setKg] = useState("");
  const [availQuant, setAvailQuant] = useState("");
  const [productTypeModal, setProductTypeModal] = useState(false);
  const [salesDateModal, setSalesDateModal] = useState(false);
  const [productType, setProductType] = useState("");
  const [salesDate, setSalesDate] = useState(new Date());
  const [salesTime, setSalesTime] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("");
  const [is_sales, setIs_sales] = useState(false);

  useEffect(() => {
    if (productType === "sales_calendar") {
      setSalesDateModal(true);
    }
  }, [productType]);

  const kgList = [
    {
      id: 1,
      name: "KG",
    },
    {
      id: 2,
      name: "LITRE",
    },
    {
      id: 3,
      name: "FLEET",
    },
    {
      id: 4,
      name: "Pieces",
    },
    {
      id: 5,
      name: "Ton",
    },
    {
      id: 6,
      name: "Gram",
    },
    {
      id: 7,
      name: "Bundles",
    },
    {
      id: 8,
      name: "Others",
    },
  ];

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please grant permission to access the media library to pick an image."
      );
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // You can also convert the image to a base64 string here
      const base64 = await convertImageToBase64(result.uri);
      // Now you can send the 'base64' string to your backend
      // console.log(base64);
      setBase64(base64);
      setListProductImgs([...listProductImgs, { image: base64 }]);
    }
  };

  const pickSecondImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSecondImage(result.uri);
      // You can also convert the image to a base64 string here
      const base64 = await convertImageToBase64(result.uri);
      // Now you can send the 'base64' string to your backend
      console.log(base64);
      setBase64Two(base64);
      setListProductImgs([...listProductImgs, { image: base64 }]);
    }
  };
  const pickThirdImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setThirdImage(result.uri);
      // You can also convert the image to a base64 string here
      const base64 = await convertImageToBase64(result.uri);
      // Now you can send the 'base64' string to your backend
      console.log(base64);
      setBase64Three(base64);
      setListProductImgs([...listProductImgs, { image: base64 }]);
    }
  };
  const pickFourthImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFourthImage(result.uri);
      // You can also convert the image to a base64 string here
      const base64 = await convertImageToBase64(result.uri);
      // Now you can send the 'base64' string to your backend
      console.log(base64);
      setBase64Four(base64);
      setListProductImgs([...listProductImgs, { image: base64 }]);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchCategories = async () => {
    axios
      .get(`${BACKEND_URL}/api/categories`)
      .then((res) => {
        console.log("categories:::", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("fetch categories error:::", err);
      });
  };

  const fetchSubCategories = async (catId) => {
    axios
      .get(`${BACKEND_URL}/api/subtypes/?category_id=${catId}`)
      .then((res) => {
        console.log("sub categories:::", res.data);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log("fetch categories error:::", err);
      });
  };

  const fetchUserData = async () => {
    const userData = await AsyncStorage.getItem("user_data");

    if (userData !== null) {
      console.log("userdata:::", userData);
      setUserData(JSON.parse(userData));
    }
  };

  useEffect(() => {
    fetchCategories();
    handleSocketConnection();
    fetchUserData();
  }, [listProductModal]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSalesDate(currentDate);
    setShowPicker(false);
  };

  const message = {
    product_name: selectedSubCategory,
    category: categoryId,
    sub_category: subCategoryId,
    description: description,
    price_per_unit: price,
    unit_of_measurement: kg,
    available_quantity: Number(availQuant),
    images: listProductImgs,
    is_sales: is_sales,
    sales_date_and_time: salesDate,
  };

  const sendMessageAction = async () => {
    setMessageLoading(true);
    // console.log("message after completion", message);
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      if (
        !message.category ||
        !message.sub_category ||
        !message.product_name ||
        !message.price_per_unit ||
        message.description === "" ||
        message.unit_of_measurement === "" ||
        message.available_quantity < 1 ||
        message.images.length < 1
      ) {
        setToastValues({
          ...toastValues,
          show: true,
          type: "Error",
          message: "Please fill all fields.",
        });
        setSalesDateModal(false);
        setMessageLoading(false);
        return;
      } else {
        console.log("Message is sending");
        console.log(
          "Sent message in farmer::",
          `${BACKEND_URL}/api/products/`,
          message
        );
        axios
          .post(`${BACKEND_URL}/api/products/`, message, {
            headers: {
              Authorization: `Bearer ${asyncToken}`,
            },
          })
          .then((res) => {
            setMessageLoading(false);
            setSalesDateModal(false);
            console.log("list response:::", res.data);
            setListProductImgs([]);
            if (productType === "sales_calendar") {
              navigation.replace("salesCalendar");
            } else {
              navigation.goBack();
            }
            fetchFarmerProducts();
          })
          .catch((err) => {
            console.log("create product error::", err.message);
            setMessageLoading(false);
          });
      }
    } else {
      console.log("There's no token for this request");
      setMessageLoading(false);
    }
  };

  return (
    <View style={styles.layout}>
      {/* LOADER LOADER */}
      {loading === true && <Loader />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.topBar}>
          <View style={styles.topBarItems}>
            <TouchableOpacity
              style={styles.flexCenter}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.titleTxt}>List a product</Text>
          </View>
        </View>

        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.topView}>
            <Text style={styles.topTxt}>
              List your available farm products so buyers can reach
              you for patronage
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              gap: 16,
            }}
            style={styles.scrollContainer}
          >
            <DropInputRight
              label="Product Category"
              placeholder="Choose category"
              Icon={
                <TouchableOpacity onPress={() => setCategoryDropDown(true)}>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
              value={selectedCategory}
            />

            <Modal
              transparent={true}
              animationType="slide"
              visible={categoryDropDown}
              onRequestClose={() => setCategoryDropDown(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {categories &&
                    categories.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setSelectedCategory(item.name);
                          setCategoryId(item.id);
                          fetchSubCategories(item.id);
                          setCategoryDropDown(false);
                        }}
                        style={styles.option}
                      >
                        <Text style={{ color: "#000" }}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </Modal>

            <Modal
              transparent={true}
              animationType="slide"
              visible={subCategoryDropDown}
              onRequestClose={() => setSubCategoryDropDown(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {subCategories &&
                    subCategories.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setSelectedSubCategory(item.name);
                          setSubCategoryId(item.id);
                          setSubCategoryDropDown(false);
                        }}
                        style={styles.option}
                      >
                        <Text style={{ color: "#000" }}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </Modal>

            <DropInputRight
              label="Product Name"
              placeholder="Choose product"
              Icon={
                <TouchableOpacity onPress={() => setSubCategoryDropDown(true)}>
                  <ArrowDown2 variant="Bold" color={COLORS.input} />
                </TouchableOpacity>
              }
              value={selectedSubCategory}
            />
            <TextAreaApp
              label="Write Description"
              placeholder="Tell us about your product..."
              value={description}
              onChange={(text) => {
                setDescription(text);
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
              <DropInputLeft
                label="Price/Unit"
                placeholder="0.00"
                Icon={
                  <TouchableOpacity>
                    <ArrowDown2 variant="Bold" color={COLORS.input} />
                  </TouchableOpacity>
                }
                value={price}
                onChange={(text) => setPrice(text)}
                type={"phone-pad"}
              />
              <DropInputRight
                label="Unit of Measure"
                placeholder="KG"
                Icon={
                  <TouchableOpacity onPress={() => setMeasuresModal(true)}>
                    <ArrowDown2 variant="Bold" color={COLORS.input} />
                  </TouchableOpacity>
                }
                value={kg}
              />
              <Modal
                transparent={true}
                animationType="slide"
                visible={measuresModal}
                onRequestClose={() => setMeasuresModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {kgList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setKg(item.name);
                          setMeasuresModal(false);
                        }}
                        style={styles.option}
                      >
                        <Text style={{ color: "#000" }}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              <Input
                label={"Available Quantity"}
                placeholder="Enter quantity"
                type={"phone-pad"}
                value={availQuant}
                onChangeText={(text) => setAvailQuant(text)}
              />
            </View>

            <ImageInput
              label="Upload Image"
              height={130}
              onPress={() => {
                pickImage();
              }}
              image={image}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
              }}
            >
              <ImageInput
                height={80}
                onPress={() => {
                  pickSecondImage();
                }}
                image={secondImage}
              />
              <ImageInput
                height={80}
                onPress={() => {
                  pickThirdImage();
                }}
                image={thirdImage}
              />
              <ImageInput
                height={80}
                onPress={() => {
                  pickFourthImage();
                }}
                image={fourthImage}
              />
            </View>

            {/* BUTTON COMPONENT */}
            {messageLoading ? (
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
                  // sendMessageAction();
                  setProductTypeModal(true);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          <Modal
            transparent={true}
            animationType="slide"
            visible={productTypeModal}
            onRequestClose={() => setSubCategoryDropDown(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 50,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setProductTypeModal(false)}
                    style={{
                      borderWidth: 1,
                      padding: 5,
                    }}
                  >
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "montBold",
                    }}
                  >
                    Choose Sales Type
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "montReg",
                      color: "#73777F",
                      maxWidth: 396,
                      marginTop: 20,
                    }}
                  >
                    Choose your sales type here to determine where it will be
                    listed
                  </Text>
                </View>

                <View style={{ marginTop: 44 }}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      borderColor: "#e4e4e4e8",
                      paddingVertical: 18,
                    }}
                    onPress={() => {
                      setProductType("regular_sales");
                      setProductTypeModal(false);
                      sendMessageAction();
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Regular Sales
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      borderColor: "#e4e4e4e8",
                      paddingVertical: 18,
                    }}
                    onPress={() => {
                      setProductType("sales_calendar");
                      setIs_sales(true);
                      setProductTypeModal(false);
                      setSalesDateModal(true);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Sales Calendar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            transparent={true}
            animationType="slide"
            visible={salesDateModal}
            onRequestClose={() => setSubCategoryDropDown(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginBottom: 50,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setSalesDateModal(false)}
                    style={{
                      borderWidth: 1,
                      padding: 5,
                    }}
                  >
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "montBold",
                    }}
                  >
                    Choose Date & Time
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontFamily: "montReg",
                      color: "#73777F",
                      maxWidth: 396,
                      marginTop: 20,
                    }}
                  >
                    Set your sales date to complete the sales calendar process
                  </Text>
                </View>

                <View style={{ marginTop: 44, paddingHorizontal: 16 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      marginVertical: 20,
                      fontSize: 18,
                      fontFamily: "montSBold",
                    }}
                  >
                    {moment(salesDate).format(
                      "Do, MMM, YYYY[\n] [\n][By] hh:mm A"
                    )}
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      borderColor: "#e4e4e4e8",
                      paddingVertical: 18,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      setShowPicker(true);
                      setMode("date");
                      // setSalesDateModal(false);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Date
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderBottomWidth: 1,
                      borderColor: "#e4e4e4e8",
                      paddingVertical: 18,
                      marginTop: 34,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      setShowPicker(true);
                      setMode("time");
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Time
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontFamily: "montSBold",
                      }}
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>

                {showPicker && (
                  <DateTimePicker
                    mode={mode}
                    display="spinner"
                    value={salesDate}
                    onChange={onChange}
                    is24Hour={true}
                  />
                )}
                {messageLoading ? (
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
                      // sendMessageAction();
                      // setProductTypeModal(true);
                      sendMessageAction();
                    }}
                    style={[styles.button, { marginTop: 34 }]}
                  >
                    <Text style={styles.buttonText}>Finish</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DynamicListProduct;

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
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    paddingVertical: 34,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
    paddingTop: 10,
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

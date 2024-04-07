import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  ArrowDown2,
  Camera,
  Eye,
  EyeSlash,
  Gps,
  Location,
  SearchNormal,
  SearchNormal1,
} from "iconsax-react-native";
import { COLORS } from "./constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../context/context.service";
import statesData from "./constants/statesData";

// const states = [
//   "Abia",
//   "Adamawa",
//   "Akwa Ibom",
//   "Anambra",
//   "Bauchi",
//   "Bayelsa",
//   "Benue",
//   "Borno",
//   "Cross River",
//   "Delta",
//   "Ebonyi",
//   "Edo",
//   "Ekiti",
//   "Enugu",
//   "FCT",
//   "Gombe",
//   "Imo",
//   "Jigawa",
//   "Kaduna",
//   "Kano",
//   "Katsina",
//   "Kebbi",
//   "Kogi",
//   "Kwara",
//   "Lagos",
//   "Nasarawa",
//   "Niger",
//   "Ogun",
//   "Ondo",
//   "Osun",
//   "Oyo",
//   "Plateau",
//   "Rivers",
//   "Sokoto",
//   "Taraba",
//   "Yobe",
//   "Zamfara",
// ];

const Input = ({
  label,
  iconName,
  error,
  password,
  visible,
  value,
  onChangeText,
  onFocus = () => {},
  type,
  onBlur,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const { setToastValues, toastValues } = useContext(GlobalContext);

  useEffect(() => {
    if (visible === true) {
      setHidePassword(!password);
    } else {
      setHidePassword(password);
    }
  }, [visible]);

  return (
    <View>
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 14,
            fontFamily: "montMid",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.textGrayLight,
            borderRadius: 8,
            paddingHorizontal: 8,
            // paddingVertical: 16,
            height: 46,
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            color: COLORS.input,
          }}
          placeholder={props.placeholder}
          secureTextEntry={hidePassword}
          value={value}
          onChangeText={onChangeText}
          keyboardType={type}
          onBlur={() => {
            // if (label === "First Name" || label === "Last Name") {
            //   if (value.length < 3) {
            //     setToastValues({
            //       ...toastValues,
            //       show: true,
            //       type: "Error",
            //       message: `${label} must be up to or more than 3 characters`,
            //     });
            //   }
            // }

            if (label === "Email Address") {
              if (!value.includes("@") || !value.includes(".")) {
                setToastValues({
                  ...toastValues,
                  show: true,
                  type: "Error",
                  message: `Please use a valid ${label}`,
                });
              }
            }

            if (label.includes("Phone Number")) {
              if (value !== undefined) {
                if (value.length < 10) {
                  setToastValues({
                    ...toastValues,
                    show: true,
                    type: "Error",
                    message: `Please use a valid ${label}`,
                  });
                }
              }
            }
          }}
        />

        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS["80%"],
            backgroundColor: "pink",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          {iconName}
        </View>
      </View>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default Input;

export const LocationInput = ({
  label,
  Type,
  Icon,
  placeholder,
  value,
  onChangeText,
  locationAction,
  locationLoading,
}) => {
  return (
    <View style={{}}>
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.label,
          fontSize: 14,
          fontFamily: "montMid",
          marginBottom: 8,
        }}
      >
        {locationLoading ? "Please wait..." : "Farm Address"}
      </Text>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 5,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={locationAction}>
          <Gps variant="Bold" style={{}} color={COLORS.primary} />
        </TouchableOpacity>
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={false}
        />
      </View>
    </View>
  );
};

export const PasswordInput = ({
  label,
  Type,
  iconName,
  visible,
  toggleVisible,
  placeholder,
  errorMsg,
  value,
  onChangeText,
  type,
}) => {
  const { setToastValues, toastValues } = useContext(GlobalContext);
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 14,
            fontFamily: "montMid",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 5,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          onBlur={() => {
            if (value.length <= 8) {
              setToastValues({
                ...toastValues,
                show: true,
                type: "Error",
                message: `Password must be up to or more than 8 characters`,
              });
            }
          }}
        />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 16,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        {visible === true ? (
          <TouchableOpacity onPress={toggleVisible}>
            <EyeSlash
              onPress={toggleVisible}
              size="24"
              color={COLORS["80%"]}
              variant="Broken"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleVisible}>
            <Eye
              onPress={toggleVisible}
              size="24"
              color={COLORS["80%"]}
              variant="Broken"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMsg && (
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 12,
            color: COLORS.infoTxt,
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export const PasswordInput2 = ({
  label,
  Type,
  iconName,
  visible,
  toggleVisible,
  placeholder,
  errorMsg,
}) => {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 16,
            fontFamily: "space300",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: COLORS.textGrayLight,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "space200",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
        />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 16,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        {visible === true ? (
          <TouchableOpacity onPress={toggleVisible}>
            <EyeSlash
              onPress={toggleVisible}
              size="24"
              color={COLORS["80%"]}
              variant="Broken"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleVisible}>
            <Eye
              onPress={toggleVisible}
              size="24"
              color={COLORS["80%"]}
              variant="Broken"
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMsg && (
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 12,
            color: COLORS.infoTxt,
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export const SearchInput = ({ label, Type, Icon, placeholder }) => {
  return (
    <View style={{}}>
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 16,
            fontFamily: "space300",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <SearchNormal1 variant="Linear" style={{}} color={COLORS.primary} />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "space200",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export const SearchInput2 = ({ label, Type, Icon, placeholder }) => {
  return (
    <View style={{ flex: 1, height: 30 }}>
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 12,
            fontFamily: "space300",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.input10,
          borderRadius: 4,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 40,
          gap: 6,
          alignItems: "center",
        }}
      >
        <SearchNormal1
          variant="Linear"
          size="16"
          style={{}}
          color={COLORS.input60}
        />
        {/* <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        /> */}
        <TextInput
          style={{
            fontSize: 12,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
            paddingVertical: 4,
          }}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export const DropInputLeft = ({
  label,
  type,
  Icon,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.label,
          fontSize: 14,
          fontFamily: "montMid",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          flex: 1,
          alignItems: "center",
        }}
      >
        {Icon}
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType={type}
        />
      </View>
    </View>
  );
};

export const DropInputRight = ({
  label,
  Type,
  Icon,
  placeholder,
  value,
  onOpenDropdown,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.label,
          fontSize: 14,
          fontFamily: "montMid",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          editable={false}
        />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TouchableOpacity onPress={onOpenDropdown}>{Icon}</TouchableOpacity>
      </View>
    </View>
  );
};

export const TextAreaApp = ({
  label,
  Type,
  Icon,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <View style={{}}>
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.label,
          fontSize: 16,
          fontFamily: "space300",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          // width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          paddingHorizontal: 8,
        }}
        multiline={true}
        numberOfLines={4}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
    </View>
  );
};

export const ImageInput = ({
  label,
  image,
  Type,
  Icon,
  placeholder,
  height,
  width,
  onPress,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 16,
            fontFamily: "space300",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          height,
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          alignItems: "center",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            width={300}
            height={130}
            style={{
              width: "100%",
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera color={COLORS.textGrayLight} />
          </View>
        )}
      </TouchableOpacity>
      {/* <TextInput
        style={{
          width: "100%",
          height,
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          padding: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          alignItems: "center",
        }}

        multiline={true}
        numberOfLines={10}

      /> */}
    </View>
  );
};

export const EditableInput = ({
  label,
  Type,
  iconName,
  visible,
  toggleVisible,
  placeholder,
  errorMsg,
  value,
  disabled,
}) => {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS["80%"],
            fontSize: 14,
            fontFamily: "montMid",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: COLORS.textGrayLight,
          paddingHorizontal: 0,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "space200",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            backgroundColor: COLORS.inputEdit,
            height: "100%",
          }}
          type={Type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </View>
      {errorMsg && (
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 12,
            color: COLORS.infoTxt,
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export const EditableInputTransparent = ({
  label,
  Type,
  iconName,
  visible,
  toggleVisible,
  placeholder,
  errorMsg,
  value,
  disabled,
}) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.input,
            fontSize: 16,
            fontFamily: "montBold",
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          borderBottomWidth: 0.2,
          borderColor: COLORS.blackTrans80,
          paddingHorizontal: 0,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 42,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 14,
            fontFamily: "montReg",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          type={Type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      </View>
      {errorMsg && (
        <Text
          style={{
            fontFamily: "montReg",
            fontSize: 12,
            color: COLORS.infoTxt,
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export const StatePicker = ({ label, icon, data, nextLabel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localGovModalVisible, setLocalGovModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const {
    selectedState,
    setSelectedState,
    selectedLocalGovt,
    setSelectedLocalGovt,
  } = useContext(GlobalContext);

  const renderStateItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setModalVisible(false);
        setSelectedState(item);
        setSelectedLocalGovt(null);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderLocalGovItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedLocalGovt(item);
        setLocalGovModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const localGovs = statesData[selectedState] || [];

  return (
    <View>
      {label && (
        <Text
          style={{
            width: "100%",
            textAlign: "left",
            color: COLORS.label,
            fontSize: 16,
            fontFamily: "montMid",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.textGrayLight,
          borderRadius: 8,
          paddingHorizontal: 8,
          height: 46,
          zIndex: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "space200",
            color: selectedState ? COLORS.input : "#ccc",
          }}
        >
          {selectedState || "Select State"}
        </Text>
        <ArrowDown2
          color={COLORS.textGrayLight}
          size="20"
          style={{ position: "absolute", right: 5 }}
        />
      </TouchableOpacity>

      <View style={{ marginTop: 24 }}>
        {nextLabel && (
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              color: COLORS.label,
              fontSize: 16,
              fontFamily: "space300",
              marginBottom: 8,
            }}
          >
            {nextLabel}
          </Text>
        )}
        <TouchableOpacity
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.textGrayLight,
            borderRadius: 8,
            paddingHorizontal: 8,
            height: 46,
            zIndex: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setLocalGovModalVisible(true)}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "space200",
              color: selectedLocalGovt ? COLORS.input : "#ccc",
            }}
          >
            {selectedLocalGovt || "Select Local government"}
          </Text>
          <ArrowDown2
            color={COLORS.textGrayLight}
            size="20"
            style={{ position: "absolute", right: 5 }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.modal,
            {
              paddingTop:
                Platform.OS === "android" ? insets.top + 20 : insets.top,
              paddingBottom:
                Platform.OS === "android" ? insets.top + 20 : insets.top,
            },
          ]}
        >
          <TouchableOpacity
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={Object.keys(statesData)}
            renderItem={renderStateItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={localGovModalVisible}
        onRequestClose={() => setLocalGovModalVisible(false)}
      >
        <View
          style={[
            styles.modal,
            {
              paddingTop:
                Platform.OS === "android" ? insets.top + 20 : insets.top,
              paddingBottom:
                Platform.OS === "android" ? insets.top + 20 : insets.top,
            },
          ]}
        >
          <TouchableOpacity
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
            }}
            onPress={() => setLocalGovModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={localGovs}
            renderItem={renderLocalGovItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export const EditableLocationInput = ({
  label,
  Type,
  Icon,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={{}}>
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.label,
          fontSize: 14,
          fontFamily: "montMid",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: COLORS.textGrayLight,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
          backgroundColor: COLORS.inputEdit,
        }}
      >
        <Gps variant="Bold" style={{}} color={COLORS.primary} />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "space200",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export const EditableLocationInputTrans = ({
  label,
  Type,
  Icon,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          width: "100%",
          textAlign: "left",
          color: COLORS.input,
          fontSize: 16,
          fontFamily: "montBold",
        }}
      >
        {label}
      </Text>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 0.2,
          borderColor: COLORS.blackTrans80,
          paddingHorizontal: 8,
          flexDirection: "row",
          // paddingVertical: 16,
          height: 46,
          alignItems: "center",
        }}
      >
        <Gps variant="Bold" style={{}} color={COLORS.primary} />
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: COLORS.textGray,
            height: 22,
            marginHorizontal: 6,
            opacity: 0.3,
          }}
        />
        <TextInput
          style={{
            fontSize: 16,
            fontFamily: "space200",
            zIndex: 0,
            flex: 1,
            color: COLORS.input,
            height: "100%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

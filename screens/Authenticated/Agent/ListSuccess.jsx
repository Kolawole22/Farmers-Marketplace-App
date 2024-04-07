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
import { PinInput } from "@pakenfit/react-native-pin-input";
import AgentDashboard from "./AgentDashboard";

const List2 = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisisble] = useState(true);


    return (
        <View style={[styles.layout]}>
            {/* LOADER LOADER */}
            {loading === true && <Loader />}

            <View style={styles.topBar}>
                <View style={styles.topBarItems}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("agentDashboard")}
                        style={styles.flexCenter}>
                        <CloseCircle variant="Bold" color={COLORS.input} />
                    </TouchableOpacity>
                    {/* <Text style={styles.titleTxt}>List a product</Text> */}

                </View>
            </View>


            <SafeAreaView style={styles.safeContainer}>


                <View style={styles.topView}>

                    <View style={styles.stepView} >
                        <Text style={styles.titleTxt} > Listing Successful</Text>
                    </View>

                    <Text style={styles.topTxt}>
                        Your product has been listed successfully!
                    </Text>
                    <Text style={styles.topTxt}>
                        A Unique code has been sent to your mobile number, save the code as it is to verify the product sale
                    </Text>

                    <View style={styles.buttons} >
                        <TouchableOpacity style={styles.buttonLine} >
                            <Text style={styles.buttonLineText} >Go to Farmers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText} >Preview Listing</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </SafeAreaView>
        </View>
    );
};

export default List2;

const styles = StyleSheet.create({
    layout: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    topBar: {
        height: 95,
        backgroundColor: COLORS.white,
        justifyContent: "flex-end",
        width: "100%",
    },
    topBarItems: {
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "flex-end",
        paddingBottom: 16,
        gap: 8,
    },
    titleTxt: {
        fontFamily: "montSBold",
        color: COLORS.input,
        fontSize: 28,
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
        flex:1,
        paddingHorizontal: 22,
        marginBottom: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    topTxt: {
        fontFamily: "montReg",
        fontSize: 16,
        textAlign: "center",
        color: COLORS.input,
        marginTop: 8
    },
    scrollContainer: {
        width: "100%",
        paddingHorizontal: 16,
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        gap: 16
    },
    button: {
        backgroundColor: COLORS.primary1,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        height: 48,
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary1,
    },
    buttonLine: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.primary1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        height: 48,
        flex: 1
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: "montMid",
        fontSize: 16,
    },
    buttonLineText: {
        color: COLORS.primary1,
        fontFamily: "montMid",
        fontSize: 16,
    },
    stepView: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },
    step: {
        fontFamily: "montReg",
        fontSize: 16,
        color: COLORS.input,
    },
    viewForm: {
        paddingHorizontal: 16
    },

});

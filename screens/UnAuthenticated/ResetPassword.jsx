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
import React, { useEffect, useState } from "react";
import { ArrowDown2, Eye, EyeSlash } from "iconsax-react-native";
import { COLORS, SIZES } from "../../components/constants";
import { StyleSheet } from "react-native";
import Input, { LocationInput } from "../../components/Input";
import { TextInput } from "react-native";

const ResetPassword = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [riderGotten, setRiderGotten] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <ImageBackground
            style={[
                styles.safeContainer,
                {
                    width: "100%",
                },
            ]}
            source={require("../../assets/images/formbg1.png")}
        >
            <View style={{ flex: 1 }}>
                <View style={styles.register}>
                    {/* HEADER TXT */}
                    <Text style={styles.headTxt}>Reset Password</Text>
                    <Text style={styles.parag}>
                        Enter the mobile number associated with this account
                    </Text>
                </View>
                <ScrollView style={{}}>
                    <View style={styles.container}>
                        {/* form View */}
                        <View style={styles.viewForm}>
                            <Input
                                label=""
                                type="number"
                                placeholder="Enter 11 digit phone Number"
                            />


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
                                    onPress={() => { navigation.navigate("EnterOTP") }}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>Send OTP</Text>
                                </TouchableOpacity>
                            )}

                            <View style={styles.signInOptions}></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ResetPassword;

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
        color: COLORS.primary,
        fontFamily: "space500",
        marginBottom: 12,
    },
    stepTxt: {
        fontSize: 16,
        fontFamily: "space200",
        color: COLORS.input,
        marginBottom: 32,
    },
    parag: {
        paddingHorizontal: 14,
        width: "100%",
        textAlign: "center",
        fontFamily: "space200",
        marginBottom: 28,
        color: COLORS["80%"],
    },
    viewForm: {
        width: "100%",
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        marginVertical: 16,
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
});

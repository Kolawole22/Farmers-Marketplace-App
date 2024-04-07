import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SHADOWS } from "../../../components/constants";
import { Add, ArrowDown2, ArrowLeft, Calendar, CloseCircle } from "iconsax-react-native";
import Input, {
    DropInputLeft,
    DropInputRight,
    EditableInput,
    ImageInput,
    PasswordInput2,
    TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { Image } from "react-native";
import CalendarItem from "../../../components/CalendarItem";

const ChangePassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.layout}>
            <TouchableOpacity
                onPress={() => { navigation.navigate("setupSalesCalendar") }}
                style={{
                    position: "absolute",
                    bottom: 90,
                    right: 16,
                    backgroundColor: COLORS.accent,
                    width: 64,
                    height: 64,
                    borderRadius: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    ...SHADOWS.medium,
                }}
            >
                <Add size="34" color={COLORS.white} />
            </TouchableOpacity>
            {/* LOADER LOADER */}
            {loading === true && <Loader />}


            <View style={styles.topBar}>
                <View style={styles.topBarItems}>
                    <TouchableOpacity style={styles.flexCenter}>
                        <ArrowLeft color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.titleTxt}>Change Password</Text>

                </View>
            </View>

            <SafeAreaView style={styles.safeContainer}>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 28,
                        gap: 16,
                        color: COLORS["80%"]
                    }}
                    style={styles.scrollContainer}
                    >
                    <Text style={{
                        fontFamily: "montReg",
                        fontSize: 16,
                        marginBottom :30
                    }} >Your new Password must be lorem ipsum  and send a message to get yours (wholesale deals)</Text>

                    <PasswordInput2
                        placeholder="Old Password"
                    />
                    <PasswordInput2
                        placeholder="New Password"
                    />
                    <PasswordInput2
                        placeholder="Confirm New Password"
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
                            onPress={() => {
                                navigation.navigate("dashboard");
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    )}
                    

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({

    register: {
        marginTop: 30,
        alignItems: "center",
    },
    headTxt: {
        fontSize: 28,
        color: COLORS.primary,
        fontFamily: "space500",
        marginBottom: 12,
    },
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
        gap: 10
    },
    titleTxt: {
        fontFamily: "space500",
        color: COLORS.white,
        fontSize: 24,
        flex: 1
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

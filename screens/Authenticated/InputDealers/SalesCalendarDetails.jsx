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
import { Add, ArrowDown2, ArrowLeft, Calendar, CloseCircle, Edit, Location, Tag, WeightMeter } from "iconsax-react-native";
import Input, {
    DropInputLeft,
    DropInputRight,
    EditableInput,
    ImageInput,
    TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { Image } from "react-native";
import CalendarItem from "../../../components/CalendarItem";

const SalesCalendarDetails = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.layout}>
            {/* LOADER LOADER */}
            {loading === true && <Loader />}


            <View style={styles.topBar}>
                <View style={styles.topBarItems}>
                    <TouchableOpacity style={styles.flexCenter}>
                        <ArrowLeft color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.titleTxt}>My Sales  Calendar</Text>
                    <TouchableOpacity style={styles.flexCenter}>
                        <Edit size="18" color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>

            <SafeAreaView style={styles.safeContainer}>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 28,
                    }}
                    style={styles.scrollContainer}
                >

                    <View style={{
                        width: "100%",
                        aspectRatio: 1.7,
                        borderRadius: 8,
                        overflow: "hidden",
                    }} >
                        <Image
                            source={{ uri: "https://img.freepik.com/premium-photo/raw-catfish-cutting-board-cooking-fish_418821-1127.jpg?w=740" }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </View>

                    <Text style={{
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "montBold",
                        fontSize: 18,
                        lineHeight: 32,
                        color: COLORS.input,
                        marginTop: 20
                    }} >CatFish Bulk Sales</Text>
                    <Text style={{
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "montMid",
                        fontSize: 16,
                        color: COLORS.primary1
                    }}  >Fishery</Text>

                    <View>
                        <View style={styles.profileLink}  >
                            <Location color={COLORS.input} size="16" />
                            <Text style={styles.profileLinkTxt} >No. 8, Mountain street, Bomadi, Niger Delta</Text>
                        </View>
                        <View style={styles.profileLink}  >
                            <Tag color={COLORS.input} size="16" />
                            <Text style={styles.profileLinkTxt} > <Text style={styles.strong} >N1200</Text>/KG</Text>
                        </View>
                        <View style={styles.profileLink}  >
                            <WeightMeter color={COLORS.input} size="16" />
                            <Text style={styles.profileLinkTxt} > <Text style={styles.strong} >300 </Text>KG Available</Text>
                        </View>
                        <View style={styles.profileLink}  >
                            <Location color={COLORS.input} size="16" />
                            <Text style={styles.profileLinkTxt} >Monday, Nov 16, 2023</Text>
                        </View>
                        <View style={styles.profileLink}  >
                            <Location color={COLORS.input} size="16" />
                            <Text style={styles.profileLinkTxt} >from 9AM to 5PM</Text>
                        </View>
                    </View>

                    <Text style={styles.details} >Details</Text>
                    <View style={styles.detailsView} >
                        <Text style={styles.dvTxt} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, voluptatem fuga, mollitia similique ipsum id eius accusamus, quaerat dolorum temporibus delectus nobis in.</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default SalesCalendarDetails;

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
    profileLink: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        width: "100%",
        height: 40,
    },
    profileLinkTxt: {
        fontFamily: "montReg",
        fontSize: 14,
        color: COLORS.input
    },
    strong: {
        fontFamily: "montSBold"
    },
    details: {
        fontFamily: "montReg",
        fontSize: 16,
        color: COLORS.black,
        marginTop: 24,
        marginBottom: 8
    },
    detailsView: {
        width: "100%",
        padding: 10,
        backgroundColor: COLORS.inputEdit
    },
    dvTxt: {
        fontFamily: "montReg",
        fontSize: 16, 
        color :COLORS["80%"]
    }
});

import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLORS } from "../../../components/constants";
import { ArrowDown2, ArrowLeft, CloseCircle, FilterSearch } from "iconsax-react-native";
import Input, {
    DropInputLeft,
    DropInputRight,
    ImageInput,
    SearchInput2,
    TextAreaApp,
} from "../../../components/Input";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../../components/Loader";
import { GlobalContext } from "../../../context/context.service";
import { products2, quickLinks, tabs, tabs2 } from "../../../components/constants/slides";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import CategoryCard from "../../../components/CategoryCard";
import BuyerProductCard from "../../../components/BuyerProductCard";
import AgentSalesCalendarCard from "../../../components/AgentSalesCalendarCard";


const QuickLink = ({ item }) => {
    return (
        <TouchableOpacity style={{
            width: "18%",
            justifyContent: "center",
            alignItems: "center"
        }} onPress={() => { }}>
            <View
                style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: COLORS.accent,
                    marginBottom: 4,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={item.icon}
                    style={{
                        width: 27,
                        height: 27,
                    }}
                />
            </View>
            <Text
                style={{
                    fontFamily: "montMid",
                    fontSize: 12,
                    color: COLORS.input,
                }}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};

const ProductList = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Active Product Lists");

    return (
        <TouchableWithoutFeedback >
            <View style={[styles.layout]}>
                {/* LOADER LOADER */}
                {loading === true && <Loader />}
                
                
                
                <View style={styles.topBar}>
                    <View style={styles.topBarItems}>
                        <TouchableOpacity style={styles.flexCenter}>
                            <ArrowLeft color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>Product Listings</Text>
                    </View>
                </View>



                <View style={styles.tabs}>
                    {tabs2?.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={styles.tab(activeTab, tab)}
                        >
                            <Text style={styles.tabTxt(activeTab, tab)}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                



                <View style={styles.fishFilter}>
                    <SearchInput2
                        placeholder='Search your list'
                    />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.viewAllTxt}>Filter</Text>
                        <FilterSearch size="14" color={COLORS.input} />
                    </TouchableOpacity>
                </View>

                


                {
                    activeTab === "Active Product Lists" && (
                        <View style={styles.bottom}>

                            {/* CATEGORY AND FILTER */}
                            <View style={styles.catFilter}>
                                <Text style={styles.catTitleTxt}>Categories</Text>
                                <TouchableOpacity style={styles.viewAllBtn}>
                                    <Text style={styles.viewAllTxt}>View all</Text>
                                    <ArrowDown2 variant="Bold" size="18" color={COLORS.input} />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                gap: 8,
                                marginTop: 8,

                            }} >
                                {quickLinks?.map((link) => (<QuickLink key={link.id} item={link} />))}
                            </View>

                            {/* CATEGORY AND FILTER */}
                            <View style={styles.fishFilter2}>
                                <Text style={styles.catTitleTxt}>Fishery List</Text>
                                <TouchableOpacity style={styles.filterBtn}>
                                    <Text style={styles.viewAllTxt}>Filter</Text>
                                    <FilterSearch size="14" color={COLORS.input} />
                                </TouchableOpacity>
                            </View>

                            {/* LIST OF CARDS */}
                            <SafeAreaComponent>
                                <View style={styles.categoryCards}>
                                    {products2?.map((item) => (
                                        <CategoryCard key={item.id} data={item} navigation={navigation} />
                                    ))}
                                </View>
                            </SafeAreaComponent>
                        </View>
                    )
                }


                
                {
                    activeTab === "Sales Calendar" && (
                        <View style={styles.bottom2}>

                            {/* <SafeAreaComponent> */}
                            <SafeAreaComponent>

                                {/* PRODUCT LISTINGS */}
                                <View style={styles.productLists}>

                                    {products2 && products2.length ? products2.map((product) => (<AgentSalesCalendarCard key={product.id} navigation={navigation} product={product} />)) : (<Empty
                                        text="No Product Listed"
                                        subtext="You have no completed products"
                                    />)}
                                </View>
                            </SafeAreaComponent>
                        </View>
                    )
                }


            </View>
        </TouchableWithoutFeedback>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    layout: {
        backgroundColor: COLORS.white,
        flex: 1,
        width: "100%",
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
        gap: 8
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
        backgroundColor: COLORS.primary1,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        height: 48,
        marginTop: 8
    },
    buttonText: {
        color: COLORS.white,
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
        color: COLORS.input
    },
    tabs: {
        width: "100%",
        flexDirection: "row",
        marginTop: 16,
        paddingHorizontal: 16
    },
    tab: (activeTab, tab) => ({
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        height: 38,
        borderBottomWidth: activeTab === tab ? 2 : 0.5,
        borderColor: activeTab === tab ? COLORS.primary : COLORS["80%"],
    }),
    tabTxt: (activeTab, tab) => ({
        fontFamily: activeTab === tab ? "montBold" : "montReg",
        color: activeTab === tab ? COLORS.primary : COLORS["80%"],
    }),
    bottom: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: "100%",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    bottom2: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: "100%",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        paddingHorizontal: 16,
    },
    catFilter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    catTitleTxt: {
        color: COLORS.input,
        fontFamily: "montEBold",
        fontSize: 14,
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.8,
        gap: 2,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
        height: 30,
        borderColor: COLORS.input10,
    },
    viewAllTxt: {
        color: COLORS.input,
        fontFamily: "montMid",
        fontSize: 14,
    },
    fishFilter: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center",
        gap: 4
    },
    fishFilter2: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center",
        gap: 4
    },
    categoryCards: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 100
    },
    cardList: {
        width: "100%",
        height: "100%",
        backgroundColor: "yellow"
    },
    cardGrid: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        
    },
    productLists: {
        flex: 1,
        width: "100%",
        gap: 24
        // backgroundColor: "orange"
    },
});

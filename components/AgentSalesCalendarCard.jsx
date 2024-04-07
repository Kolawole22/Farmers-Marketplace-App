import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SHADOWS } from './constants'
import { Edit, RotateLeft, TimerStart } from 'iconsax-react-native'

const AgentSalesCalendarCard = ({ product, navigation, id }) => {

    const [data, setData] = useState(product);

    return (
        <TouchableOpacity

            onPress={() => { navigation.navigate('salesDetails') }}
            style={{
                backgroundColor: COLORS.white,
                paddingVertical: 16,
                paddingHorizontal: 10,
                borderRadius: 8,
                ...SHADOWS.medium,
                shadowColor: COLORS.shadow,
            }} >


            {/* TITLE */}
            <Text style={{
                fontFamily: "montBold",
                fontSize: 14,
                color: COLORS.input,
                marginBottom: 8,
                textAlign: "center"
            }} >HARMONY GREENS</Text>


            {/* IMAGE */}
            <View style={{
                width: "100%",
                backgroundColor: "orange",
                //   height: 176,
                aspectRatio: 2.14,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                positions: "relative",
                //   overflow: "hidden"
            }} >
                <Image
                    source={{ uri: data?.image }}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,

                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        backgroundColor: COLORS.accent,
                        alignItems: "center",
                        justifyContent: "center",
                        top: 10,
                        right: 10,
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        gap: 6
                    }} >
                    <TimerStart size="20" color={COLORS.white} />
                    <Text style={{
                        color: COLORS.white,
                        fontFamily: "montMid",
                        fontSize: 12
                    }} > 20th November</Text>
                </View>

                <View style={{
                    position: "absolute",
                    backgroundColor: COLORS.primary1,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 4,
                    minWidth: 112,
                    left: 0,
                    bottom: -10
                }} >

                    <Text style={{
                        color: COLORS.white,
                        fontFamily: "montMid",
                        fontSize: 16,

                    }} >{data?.category}</Text>
                </View>


            </View>
            <View style={{
                marginTop: 20,
                gap: 8
            }} >
                <Text style={{
                    fontFamily: "montReg",
                    fontSize: 14,
                    color: COLORS.input,
                }} >{data?.title}</Text>
                <Text style={{
                    fontFamily: "montBold",
                    fontSize: 14,
                    color: COLORS.primary1,
                }} >₦{data?.price}<Text style={{
                    fontFamily: "montMid",
                    fontSize: 14,
                    color: COLORS.input,
                }} >/KG</Text></Text>
                <Text style={{
                    fontFamily: "montReg",
                    fontSize: 14,
                    color: COLORS.input,
                }} >Q: <Text style={{}} >{data?.quantity}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

export default AgentSalesCalendarCard;
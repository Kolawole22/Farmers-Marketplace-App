import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from './constants'

const SalesCalendarItem = ({ status, navigation }) => {
    return (
        <TouchableOpacity onPress={() => (navigation.push('updateOrder'))} style={a.cardandLabel} >
            <Text style={a.date} >MONDAY, NOV 16</Text>

            <View style={a.card(status)} >
                <View style={a.cardTop} >
                    <Text style={a.cardTopText}  >CatFist Bulk Sales</Text>
                    <Text style={a.cardTopText2}  >No. 8, Mountain street, Bomadi, Niger Delta</Text>
                </View>
                <View style={a.cardBottom} >
                    <Text style={a.cardBottomText} >9:00 AM</Text>
                    <Text style={a.cardBottomText2}  >5:00 PM</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SalesCalendarItem

const a = StyleSheet.create({
    cardandLabel: {
        width: "100%",

    },
    date: {
        fontFamily: "montMid",
        fontSize: 14,
        color: COLORS.primary1,
        lineHeight: 34
    },
    card: (status) => ({
        width: "100%",
        flexDirection: "row",
        height: 64,
        alignItems: "center",
        borderLeftWidth: 3,
        paddingHorizontal: 8,
        borderColor: status === "pending" ? COLORS.accent2 : COLORS.accent,
        borderRadius: 3,
    }),
    cardTop: {
        flex: 1,
    },
    cardTopText: {
        fontFamily: "montMid",
        fontSize: 16,
        color: COLORS.input,
        lineHeight: 32,
    },
    cardTopText2: {
        fontFamily: "montReg",
        fontSize: 14,
        color: COLORS.input,
        lineHeight: 32,
    },
    cardBottomText: {
        fontFamily: "montReg",
        fontSize: 14,
        color: COLORS.input,
        lineHeight: 32,
    },
    cardBottomText2: {
        fontFamily: "montReg",
        fontSize: 14,
        color: COLORS.input60,
        lineHeight: 32,
    },
})
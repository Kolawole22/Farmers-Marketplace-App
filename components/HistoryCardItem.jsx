import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from './constants'
import { CloseCircle, TickSquare } from 'iconsax-react-native'
import { GlobalContext } from '../context/context.service'

const HistoryCardItem = ({ data, navigation }) => {


    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('approvalRequestUserDetails')}
            style={{
                width: "100%",
                borderBottomWidth: 0.4,
                borderColor: COLORS.someGray,
                gap: 8,
                flexDirection: "row",
                padding: 8,
                paddingVertical: 14
            }} >


            {/* IMAGE VIEW */}
            <View style={{
                width: 48,
                height: 48,
                borderRadius: 40,
                backgroundColor: COLORS.accent
            }} >
                <Image
                    source={require('../assets/images/userImg.png')}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>

            {/* CONTENT VIEW */}
            <View style={{
                flex: 1,
                gap: 2,
            }}  >

                <View style={{
                }} >
                    <Text style={{
                        fontFamily: "montReg",
                        fontSize: 8,
                        color: COLORS.someGray,
                    }} >ORDER ID: 13414 </Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                        gap: 4
                    }} >
                        <Text style={{
                            fontFamily: "montSBold",
                            fontSize: 16,
                            color: COLORS.input,
                            lineHeight: 28
                        }} >Joy Omowaye</Text>
                        <Text style={{
                            fontFamily: "montBold",
                            fontSize: 14,
                            color: COLORS.accent
                        }}  > .</Text>
                        <Text style={{
                            fontFamily: "montReg",
                            fontSize: 14,
                            color: COLORS.accent
                        }}  > farmer</Text>
                    </View>
                    <Text style={{
                        fontFamily: "montReg",
                        fontSize: 12,
                        color: COLORS.input
                    }} >OmowayeJoy@kelly.tim</Text>
                </View>

                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 4
                }} >
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "center",
                    }} >
                        <View
                            style={{
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 50,
                                backgroundColor: COLORS.success50,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4
                            }}
                        >
                            <Text style={{
                                fontFamily: "montMid",
                                fontSize: 12,
                                color: COLORS.primary
                            }} >Approved</Text>
                            <CloseCircle color={COLORS.primary1} size="14" />
                        </View>
                        {/* <TouchableOpacity>
                            <Text
                                style={{
                                    fontFamily: "montSBold",
                                    fontSize: 14,
                                    color: COLORS.danger
                                }}>Decline</Text>
                        </TouchableOpacity> */}
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    )
}

export default HistoryCardItem

const styles = StyleSheet.create({})
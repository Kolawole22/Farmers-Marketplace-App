import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { notifications } from './constants/slides'
import Empty from './Empty'
import NoteCardAgent from './NoteCardAgent'

const BuyersRequest = ({navigation}) => {
    return (
        notifications ? notifications.map((item, idx) => (
            <View key={idx} style={{
                marginBottom: 10
            }} >
                <Text style={{
                    fontFamily: "montBold",
                    fontSize: 14,
                    marginVertical: 16
                }} >{item.date}</Text>
                <NoteCardAgent navigation={navigation} data={item} />
            </View>
        )) : (<Empty
            text="No Approval Requests"
            subtext="New approval requests will show here"
        />)
    )
}

export default BuyersRequest

const styles = StyleSheet.create({})
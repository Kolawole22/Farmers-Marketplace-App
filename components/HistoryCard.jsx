import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from './constants';
import { TickSquare } from 'iconsax-react-native';
import NoteAgentCardItem from './NoteAgentCardItem';
import HistoryCardItem from './HistoryCardItem';

const HistoryCard = ({ data, navigation }) => {

    const [selected, setSelected] = useState(false)
    const [newData, setNewData] = useState(data)

    // const handleSelected = ()


    return (
        <View style={{
            marginBottom: 16
        }}>
            {
                newData && newData.notes && newData.notes.map((item, idx) => (
                    <HistoryCardItem key={idx} navigation={navigation} data={item} />
                ))
            }

        </View>
    ) 
}

export default HistoryCard;

const styles = StyleSheet.create({})
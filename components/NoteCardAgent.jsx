import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "./constants";
import { TickSquare } from "iconsax-react-native";
import NoteAgentCardItem from "./NoteAgentCardItem";

const NoteCardAgent = ({ data, navigation }) => {
  const [selected, setSelected] = useState(false);
  const [newData, setNewData] = useState(data);

  // const handleSelected = ()
  console.log("new data:::", newData)

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      {newData &&
        newData.map((item, idx) => (
          <NoteAgentCardItem key={idx} navigation={navigation} data={item} />
        ))}
    </View>
  );
};

export default NoteCardAgent;

const styles = StyleSheet.create({});

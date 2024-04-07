import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { notifications } from "./constants/slides";
import Empty from "./Empty";
import NoteCardAgent from "./NoteCardAgent";
import renderApprovalList from "./DayRender";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../config.service";
import { GlobalContext } from "../context/context.service";

const All = ({ navigation }) => {
  const { allUsers, getAllUsers, allUsersLoading } = useContext(GlobalContext);

  console.log("all users:::", allUsers.length)

  useEffect(() => {
    getAllUsers();
  }, []);

  return allUsersLoading ? (
    <View style={{}}>
      <ActivityIndicator />
    </View>
  ) : allUsers.length > 0 ? (
    allUsers.map((item, idx) => (
      <View
        key={idx}
        style={{
          marginBottom: 10,
        }}
      >
        <NoteCardAgent navigation={navigation} data={allUsers} />
      </View>
    ))
  ) : (
    <Empty
      text="No Approval Requests"
      subtext="New approval requests will show here"
    />
  );
};

export default All;

const styles = StyleSheet.create({});

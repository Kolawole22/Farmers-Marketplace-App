import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config.service";

export const getAllUsers = async ({}) => {
  const asyncToken = await AsyncStorage.getItem("user_token");
  setLoading(true);

  if (asyncToken !== null) {
    axios
      .get(`${BACKEND_URL}/accounts/unverified-users/`, {
        headers: {
          Authorization: `Bearer ${asyncToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log("unverified users:::", res.data);
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }
};

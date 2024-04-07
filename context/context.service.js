import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config.service";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAuthenticated, setIsAuhtenticated] = useState(false);
  const [userType, setUserType] = useState("");
  const [openDelete, setOpenDelete] = useState(true);
  const [openLogout, setOpenLogout] = useState(false);
  const [toastValues, setToastValues] = useState({
    type: "",
    message: "",
    show: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubtitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [userId, setUserId] = useState("");
  const [listProductModal, setListProductModal] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocalGovt, setSelectedLocalGovt] = useState("");
  const [userData, setUserData] = useState();
  const [userToken, setUserToken] = useState();
  const [buyerInterests, setBuyerInterets] = useState([]);
  const [farmerActiveProducts, setFarmerActiveProducts] = useState();
  const [listProductImgs, setListProductImgs] = useState([]);
  const [farmerProductsLoading, setFarmerProductsLoading] = useState(false);
  const [buyerProductsLoading, setBuyerProductsLoading] = useState(false);
  const [allBuyerProducts, setAllBuyerProducts] = useState([]);
  const [farmerProductsInterestLoading, setFarmerProductsInterestLoading] =
    useState(false);
  const [buyerInterestLoading, setBuyerInterestLoading] = useState(false);
  const [farmerInterestList, setFarmerInterestList] = useState([]);
  const [buyerSalesLoading, setBuyerSalesLoading] = useState(false);
  const [buyerSalesList, setBuyerSalesList] = useState([]);
  const [buyerInterestList, setBuyerInterestList] = useState([]);
  const [allItemsSelected, setAllItemsSelected] = useState(false);
  const [selectApprovals, setSelectApprovals] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersLoading, setALlUsersLoading] = useState(false);

  const checkUserId = async () => {
    const value = await AsyncStorage.getItem("user_id");

    if (value !== null) {
      console.log("user_id:::", value);
      setUserId(value);
      setIsNewUser(false);
    } else {
      console.log("There's no user Id, this user is new!!");
      setIsNewUser(true);
    }
  };

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user_data");
      const userToken = await AsyncStorage.getItem("user_token");
      const userType = await AsyncStorage.getItem("user_type");

      if (userData !== null) {
        console.log("user_data available:::", JSON.parse(userData));
        setUserData(JSON.parse(userData));
      } else {
        console.log("There's no user Id, this user is new!!");
      }

      if (userToken !== null) {
        console.log("user_token available:::", userToken);
        setUserToken(userToken);
        setIsAuhtenticated(true);
        if (userType !== null) setUserType(userType);
      } else {
        console.log("There's no user Id, this user is new!!");
      }
    })();
  }, []);

  const saveUserData = (data) => {
    AsyncStorage.setItem("user_data", JSON.stringify(data)).then(() =>
      console.log("data saved successfully")
    );
  };

  const saveUserToken = (token) => {
    AsyncStorage.setItem("user_token", token).then(() =>
      console.log("token saved successfully")
    );
  };

  const fetchFarmerProducts = async () => {
    setFarmerProductsLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      axios
        .get(`${BACKEND_URL}/api/products/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          console.log("Farmer products:::", res.data);
          if (res.data.length < 1) {
            setListProductModal(true);
          } else {
            console.log("There's a list of products available");
            setFarmerActiveProducts(res.data);
          }
          setFarmerProductsLoading(false);
        })
        .catch((err) => {
          console.log("fetch products error:::", err.message);
          setFarmerProductsLoading(false);
        });
    } else {
      console.log("There's no token for socket connection");
    }
  };

  const fetchBuyerProducts = async () => {
    setBuyerProductsLoading(true);

    axios
      .get(`${BACKEND_URL}/api/all-products/`)
      .then((res) => {
        // console.log("Buyer products:::", res.data);
        setAllBuyerProducts(res.data);
        setBuyerProductsLoading(false);
      })
      .catch((err) => {
        console.log("fetch products error:::", err.message);
        setBuyerProductsLoading(false);
      });
  };

  const fetchFarmerInterestsOnPrroducts = async () => {
    setFarmerProductsInterestLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      axios
        .get(`${BACKEND_URL}/api/farmer-interest-view/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          setFarmerProductsInterestLoading(false);
          console.log("farmer interests:::", res.data);
          setFarmerInterestList(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          setFarmerProductsInterestLoading(false);
        });
    }
  };

  const fetchBuyerInterests = async () => {
    setBuyerInterestLoading(true);
    const asyncToken = await AsyncStorage.getItem("user_token");
    if (asyncToken !== null) {
      axios
        .get(`${BACKEND_URL}/api/buyer-interest-view/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          setBuyerInterestLoading(false);
          console.log("buyer interests:::", res.data);
          setBuyerInterestList(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          setBuyerInterestLoading(false);
        });
    }
  };

  const fetchSalesBuyer = async () => {
    setBuyerSalesLoading(true);

    axios
      .get(`${BACKEND_URL}/api/all-sales-products/`)
      .then((res) => {
        console.log("Buyer Sales Products:::", res.data);
        setBuyerSalesList(res.data);
        setBuyerSalesLoading(false);
      })
      .catch((err) => {
        console.log("fetch sales product products error:::", err.message);
        setBuyerSalesLoading(false);
      });
  };

  const getAllUsers = async () => {
    const asyncToken = await AsyncStorage.getItem("user_token");
    setALlUsersLoading(true);

    if (asyncToken !== null) {
      axios
        .get(`${BACKEND_URL}/accounts/unverified-users/`, {
          headers: {
            Authorization: `Bearer ${asyncToken}`,
          },
        })
        .then((res) => {
          setALlUsersLoading(false);
          console.log("unverified users:::", res.data);
          setAllUsers(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          setALlUsersLoading(false);
        });
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem("user_id");
    // AsyncStorage.removeItem("user_token");
    // AsyncStorage.removeItem("user_data");
    // setIsAuhtenticated(false);
    fetchBuyerInterests();
    checkUserId();
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{
        isNewUser,
        isAuthenticated,
        setIsAuhtenticated,
        userType,
        setUserType,
        setIsNewUser,
        toastValues,
        setToastValues,
        openDelete,
        setOpenDelete,
        openLogout,
        setOpenLogout,
        openModal,
        setOpenModal,
        listProductModal,
        setListProductModal,
        modalTitle,
        setModalTitle,
        modalSubTitle,
        setModalSubtitle,
        modalAction,
        setModalAction,
        selectedState,
        setSelectedState,
        selectedLocalGovt,
        setSelectedLocalGovt,
        saveUserData,
        saveUserToken,
        userData,
        setUserData,
        userToken,
        setUserToken,
        buyerInterests,
        setBuyerInterets,
        farmerActiveProducts,
        setFarmerActiveProducts,
        listProductImgs,
        setListProductImgs,
        farmerProductsLoading,
        setFarmerProductsLoading,
        fetchFarmerProducts,
        buyerProductsLoading,
        setBuyerProductsLoading,
        fetchBuyerProducts,
        allBuyerProducts,
        setAllBuyerProducts,
        farmerProductsInterestLoading,
        setFarmerProductsInterestLoading,
        fetchFarmerInterestsOnPrroducts,
        farmerInterestList,
        setFarmerInterestList,
        allItemsSelected,
        setAllItemsSelected,
        selectApprovals,
        setSelectApprovals,
        fetchSalesBuyer,
        buyerSalesLoading,
        buyerSalesList,
        fetchBuyerInterests,
        buyerInterestList,
        buyerInterestLoading,
        setBuyerInterestList,
        isNotification,
        setIsNotification,
        allUsers,
        setAllUsers,
        getAllUsers,
        allUsersLoading,
        setALlUsersLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

import {
  CalendarTick,
  Edit,
  Lock,
  Logout,
  MessageQuestion,
  Setting2,
  Trash,
} from "iconsax-react-native";
import { COLORS } from "./theme";
import { useContext } from "react";
import { GlobalContext } from "../../context/context.service";

const onSlides = [
  {
    id: "1",
    title: "Buy and Sell Farm Products",
    description:
      "Connecting local farmers to off takers through a single digital platform with wider reach and bigger market penetration..",
    image: require("../../assets/images/onboard1.png"),
  },
  {
    id: "2",
    title: "Find Input Dealers",
    description:
      "Find verified input dealers in your locality and instantly place order for inputs without leaving your farm..",
    // description2: "Just with your phone, your locomotion has been made easier.",
    image: require("../../assets/images/onboard2.png"),
  },
  {
    id: "3",
    title: "Sales Calendar",
    description:
      "Our sales calendar feature gives you the opportunity to track the market flow and bargain directly with farmers.",
    image: require("../../assets/images/onboard3.png"),
  },
];

const onPills = [
  { id: 1, isSelected: false, title: "Palm Oil" },
  { id: 2, isSelected: false, title: "Herbs" },
  { id: 3, isSelected: false, title: "Cassava" },
  { id: 4, isSelected: false, title: "Vegetables" },
  { id: 5, isSelected: false, title: "Honey" },
  { id: 6, isSelected: false, title: "Poultry" },
  { id: 7, isSelected: false, title: "Dairy Products" },
  { id: 8, isSelected: false, title: "Fruits" },
  { id: 9, isSelected: false, title: "Fishery" },
  { id: 10, isSelected: false, title: "Hunting" },
  { id: 11, isSelected: false, title: "Corn Produce" },
  { id: 12, isSelected: false, title: "Flour" },
];

const tabs = ["Active", "Completed"];

const tabs2 = ["Active Product Lists", "Sales Calendar"];

const products = [
  // {
  //   id: 1,
  //   company: "Harmony Greens",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Fishery",
  //   title: "Fresh Catfish",
  //   price: 1200,
  //   image:
  //     "https://img.freepik.com/premium-photo/raw-catfish-cutting-board-cooking-fish_418821-1127.jpg?w=740",
  //   quantity: 500,
  // },
  // {
  //   id: 2,
  //   company: "My Daddy Fish",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Palm Oil",
  //   title: "Palm Kernels",
  //   price: 800,
  //   image:
  //     "https://img.freepik.com/free-photo/vertical-shot-piled-palm-kernel-oil-ground-perfect-background_181624-61452.jpg?w=360&t=st=1699090880~exp=1699091480~hmac=d3ddbd358ea2f84249b9a346f2b2ecabc530cca006bc82edb86a69479879e674",
  //   quantity: 1500,
  // },
  // {
  //   id: 3,
  //   company: "Harmony Greens",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Cassava",
  //   title: "Roasted Garri",
  //   price: 400,
  //   image:
  //     "https://img.freepik.com/premium-photo/cassava-flour-bowl_434193-5556.jpg?w=740",
  //   quantity: 2300,
  // },
  // {
  //   id: 4,
  //   company: "My Daddy Fish",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Poultry",
  //   title: "Broiler Chickens",
  //   price: 3500,
  //   image:
  //     "https://img.freepik.com/premium-photo/white-chickens-farm_166394-17.jpg?w=740",
  //   quantity: 3400,
  // },
  // {
  //   id: 5,
  //   company: "Harmony Greens",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Vegetables",
  //   title: "Carrots",
  //   price: 100,
  //   image:
  //     "https://img.freepik.com/free-photo/bunch-fresh-carrots-arrangement_23-2148642944.jpg?w=740&t=st=1699090994~exp=1699091594~hmac=fedeb78c7125dbd09802bd3259805700f583a93fdd8d9f02773c60031c99ce1f",
  //   quantity: 6000,
  // },
  // {
  //   id: 6,
  //   company: "Harmony Greens",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Dairy Products",
  //   title: "Fresh Milk",
  //   price: 1800,
  //   image:
  //     "https://img.freepik.com/premium-photo/man-milking-milk-cow-farming_266402-1208.jpg?w=740",
  //   quantity: 2000,
  // },
  // {
  //   id: 7,
  //   company: "My Daddy Fish",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Fruits",
  //   title: "Coconuts",
  //   price: 2000,
  //   image:
  //     "https://img.freepik.com/premium-photo/fresh-coconut-black-background-tropical-fruits-nut-top-view-free-space-your-text_187166-45975.jpg?w=826",
  //   quantity: 3600,
  // },
  // {
  //   id: 8,
  //   company: "My Daddy Fish",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Hunting",
  //   title: "Bush Meat",
  //   price: 14000,
  //   image:
  //     "https://img.freepik.com/free-photo/closeup-coypu-piece-wood-pond-daylight-autumn_181624-52136.jpg?w=740&t=st=1699091261~exp=1699091861~hmac=472e82696a751d8f886611fad66f3490403800858424b143747b40e96c1824ed",
  //   quantity: 1400,
  // },
  // {
  //   id: 9,
  //   company: "Harmony Greens",
  //   location: "Bomadi LGA, Niger Delta",
  //   category: "Corn Produce",
  //   title: "Corn Meal",
  //   price: 16380,
  //   image:
  //     "https://img.freepik.com/premium-photo/corn-groats-seeds-corncobs-wooden-rustic-table_629370-1700.jpg?w=740",
  //   quantity: 18000,
  // },
];
const products2 = [
  {
    id: 1,
    company: "Harmony Greens",
    location: "Bomadi LGA, Niger Delta",
    category: "Fishery",
    title: "Fresh Catfish",
    price: 1200,
    image:
      "https://img.freepik.com/premium-photo/raw-catfish-cutting-board-cooking-fish_418821-1127.jpg?w=740",
    quantity: 500,
  },
  {
    id: 2,
    company: "My Daddy Fish",
    location: "Bomadi LGA, Niger Delta",
    category: "Palm Oil",
    title: "Palm Kernels",
    price: 800,
    image:
      "https://img.freepik.com/free-photo/vertical-shot-piled-palm-kernel-oil-ground-perfect-background_181624-61452.jpg?w=360&t=st=1699090880~exp=1699091480~hmac=d3ddbd358ea2f84249b9a346f2b2ecabc530cca006bc82edb86a69479879e674",
    quantity: 1500,
  },
  {
    id: 3,
    company: "Harmony Greens",
    location: "Bomadi LGA, Niger Delta",
    category: "Cassava",
    title: "Roasted Garri",
    price: 400,
    image:
      "https://img.freepik.com/premium-photo/cassava-flour-bowl_434193-5556.jpg?w=740",
    quantity: 2300,
  },
  {
    id: 4,
    company: "My Daddy Fish",
    location: "Bomadi LGA, Niger Delta",
    category: "Poultry",
    title: "Broiler Chickens",
    price: 3500,
    image:
      "https://img.freepik.com/premium-photo/white-chickens-farm_166394-17.jpg?w=740",
    quantity: 3400,
  },
  {
    id: 5,
    company: "Harmony Greens",
    location: "Bomadi LGA, Niger Delta",
    category: "Vegetables",
    title: "Carrots",
    price: 100,
    image:
      "https://img.freepik.com/free-photo/bunch-fresh-carrots-arrangement_23-2148642944.jpg?w=740&t=st=1699090994~exp=1699091594~hmac=fedeb78c7125dbd09802bd3259805700f583a93fdd8d9f02773c60031c99ce1f",
    quantity: 6000,
  },
  {
    id: 6,
    company: "Harmony Greens",
    location: "Bomadi LGA, Niger Delta",
    category: "Dairy Products",
    title: "Fresh Milk",
    price: 1800,
    image:
      "https://img.freepik.com/premium-photo/man-milking-milk-cow-farming_266402-1208.jpg?w=740",
    quantity: 2000,
  },
  {
    id: 7,
    company: "My Daddy Fish",
    location: "Bomadi LGA, Niger Delta",
    category: "Fruits",
    title: "Coconuts",
    price: 2000,
    image:
      "https://img.freepik.com/premium-photo/fresh-coconut-black-background-tropical-fruits-nut-top-view-free-space-your-text_187166-45975.jpg?w=826",
    quantity: 3600,
  },
  {
    id: 8,
    company: "My Daddy Fish",
    location: "Bomadi LGA, Niger Delta",
    category: "Hunting",
    title: "Bush Meat",
    price: 14000,
    image:
      "https://img.freepik.com/free-photo/closeup-coypu-piece-wood-pond-daylight-autumn_181624-52136.jpg?w=740&t=st=1699091261~exp=1699091861~hmac=472e82696a751d8f886611fad66f3490403800858424b143747b40e96c1824ed",
    quantity: 1400,
  },
  {
    id: 9,
    company: "Harmony Greens",
    location: "Bomadi LGA, Niger Delta",
    category: "Corn Produce",
    title: "Corn Meal",
    price: 16380,
    image:
      "https://img.freepik.com/premium-photo/corn-groats-seeds-corncobs-wooden-rustic-table_629370-1700.jpg?w=740",
    quantity: 18000,
  },
];

const inputDealerProfileLinks = [
  {
    id: 1,
    title: "Edit Profile",
    icon: <Edit color={COLORS.input} size="16" />,
    route: "editProfile",
  },
  // {
  //   id: 2,
  //   title: "Sales Calendar",
  //   icon: <CalendarTick color={COLORS.input} size="16" />,
  //   route: "salesCalendar",
  // },
  // {
  //   id: 3,
  //   title: "Settings",
  //   icon: <Setting2 color={COLORS.input} size="16" />,
  //   route: "settings",
  // },
  // {
  //   id: 4,
  //   title: "Change Password",
  //   icon: <Lock color={COLORS.input} size="16" />,
  //   route: "changePassword",
  // },
  {
    id: 5,
    title: "Delete Account",
    icon: <Trash variant="Bold" color={COLORS.input} size="16" />,
    route: 1,
  },
  {
    id: 6,
    title: "Log Out",
    icon: <Logout color={COLORS.danger} size="16" />,
    route: 1,
  },
];
const farmerProfileLinks = [
  {
    id: 1,
    title: "Edit Profile",
    icon: <Edit color={COLORS.input} size="16" />,
    route: "editProfile",
  },
  {
    id: 2,
    title: "Sales Calendar",
    icon: <CalendarTick color={COLORS.input} size="16" />,
    route: "salesCalendar",
  },
  // {
  //   id: 3,
  //   title: "Settings",
  //   icon: <Setting2 color={COLORS.input} size="16" />,
  //   route: "settings",
  // },
  // {
  //   id: 4,
  //   title: "Change Password",
  //   icon: <Lock color={COLORS.input} size="16" />,
  //   route: "changePassword",
  // },
  {
    id: 5,
    title: "Delete Account",
    icon: <Trash variant="Bold" color={COLORS.input} size="16" />,
    route: 1,
  },
  {
    id: 6,
    title: "Log Out",
    icon: <Logout color={COLORS.danger} size="16" />,
    route: 1,
  },
];

const buyerProfileLinks = [
  // {
  //   id: 1,
  //   title: "Settings",
  //   icon: <Setting2 color={COLORS.input} size="16" />,
  //   route: "settings",
  // },
  {
    id: 2,
    title: "Contact Support",
    icon: <MessageQuestion color={COLORS.input} size="16" />,
    route: true,
  },
  {
    id: 5,
    title: "Delete Account",
    icon: <Trash variant="Bold" color={COLORS.input} size="16" />,
    route: 1,
  },
  {
    id: 3,
    title: "Log Out",
    icon: <Logout color={COLORS.danger} size="16" />,
    route: 1,
  },
];

const agentProfileLinks = [
  // {
  //   id: 1,
  //   title: "Settings",
  //   icon: <Setting2 color={COLORS.input} size="16" />,
  //   route: "",
  // },
  // {
  //   id: 2,
  //   title: "Change Password",
  //   icon: <Lock color={COLORS.input} size="16" />,
  //   route: "changePassword",
  // },
  {
    id: 3,
    title: "Contact Support",
    icon: <MessageQuestion color={COLORS.input} size="16" />,
    route: true,
  },
  {
    id: 4,
    title: "Delete Account",
    icon: <Trash variant="Bold" color={COLORS.input} size="16" />,
    route: 1,
  },
  {
    id: 5,
    title: "Log Out",
    icon: <Logout color={COLORS.danger} size="16" />,
    route: 1,
  },
];

const notification = [
  {
    id: 1,
    name: "Joy Omowaye",
    isList: true,
    desc: "Joy Omowaye expresses interest in your sales coming upon 5th November",
    isSelected: false,
    company: "Harmony Greens",
    category: "Farmer",
    time: "9:09am",
  },
  {
    id: 2,
    name: "Joy Omowaye",
    isList: false,
    desc: "Abdul Mohammed wants to order 100 KG of Catfish",
    isSelected: false,
    company: "Happy Bees",
    category: "Honey",
    time: "10:05am",
  },
  {
    id: 3,
    name: "Joy Omowaye",
    isList: false,
    desc: "Joy Omowaye expresses interest in your sales coming upon 5th November",
    isSelected: false,
    company: "Carrot Crunch",
    category: "Poultry",
    time: "11:45am",
  },
  {
    id: 4,
    name: "Joy Omowaye",
    isList: true,
    desc: "Abdul Mohammed wants to order 100 KG of Catfish",
    isSelected: false,
    company: "S and D Farms",
    category: "Fishery",
    time: "2:00pm",
  },
  {
    id: 5,
    name: "Joy Omowaye",
    isList: false,
    desc: "Joy Omowaye expresses interest in your sales coming upon 5th November",
    isSelected: false,
    company: "Harmony Greens",
    category: "Farmer",
    time: "3:02pm",
  },
];

const quickLinks = [
  { id: 1, title: "Fishery", icon: require("../../assets/images/fishery.png") },
  { id: 2, title: "Poultry", icon: require("../../assets/images/poultry.png") },
  { id: 3, title: "Honey", icon: require("../../assets/images/honey.png") },
  {
    id: 4,
    title: "Vegetables",
    icon: require("../../assets/images/veggies.png"),
  },
  { id: 5, title: "Fruits", icon: require("../../assets/images/fruits.png") },
];

const notifications = [
  { id: 1, isSelected: false, date: "Today", notes: notification },
  { id: 2, isSelected: false, date: "January 16th", notes: notification },
  { id: 3, isSelected: false, date: "December 12th", notes: notification },
  { id: 4, isSelected: false, date: "November 11th", notes: notification },
];

const quickFilter = [
  { id: 1, title: "ALL" },
  // {id: 2, title: "FARMERS", },
  // {id: 3, title: "BUYERS", },
  // {id: 4, title: "INPUT DEALERS", }
];

const agentTransactions = [
  {
    id: 1,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
  {
    id: 2,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
  {
    id: 3,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
  {
    id: 4,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
  {
    id: 5,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
  {
    id: 6,
    title1: "Farmer",
    title2: "Buyer",
    name1: "Adams Doe",
    name2: "Joy Omowaye",
    desc: " Adams Doe has approved a sale of 50kg of Catfish to Joy Omowaye",
    image1: require("../../assets/images/userImg.png"),
    image2: require("../../assets/images/userImg.png"),
    time: "09:09am",
  },
];

export {
  onSlides,
  onPills,
  tabs,
  tabs2,
  products,
  products2,
  farmerProfileLinks,
  notifications,
  quickLinks,
  buyerProfileLinks,
  quickFilter,
  inputDealerProfileLinks,
  agentTransactions,
  agentProfileLinks,
};

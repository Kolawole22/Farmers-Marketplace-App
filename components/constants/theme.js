
const COLORS = {
  primary: "#103B1D",
  primary10: "rgba(0, 105, 43, 0.1)",
  primary1: "#00692B",
  primary5: "rgba(25, 245, 111, 0.05)",

  secondary: "#8ABB2A",
  accent: "#8ABB2A",
  accent2: "#E9C200",
  accent3: "#FDF0B0",
  accent4: "#F2FFF7",
  accent10: "rgba(138, 187, 42, 0.1)",

  filterGray: "#787676",
  someGray: "#73777F",
  someDarkGray: "#201919",


  "80%": "#5c5c5c",
  blackTrans80:"rgba(0, 0, 0, 0.8)",
  blackTrans10:"rgba(0, 0, 0, 0.1)",
  shadow: "rgba(0, 0, 0, 0.15)",
  icons: "#292D32",
  
  label: "#3D4A5C",
  input: "#333",
  input10: "rgba(51, 51, 51, 0.1)",
  input20: "rgba(51, 51, 51, 0.2)",
  input60: "rgba(51, 51, 51, 0.6)",
  input80: "rgba(51, 51, 51, 0.8)",
  inputEdit:"#F9FAFB",
  infoTxt: "#8F8F8F",
  line: "#D7DFE9",
  hiPill: "#FDF0B0",

  white: "#FFFFFF",
  whiteTrans: "rgba(255, 255, 255, 0.1)",
  darkWhite: "#F7F7F7",
  black: "#000000",
  blackTen: "rgba(0, 0, 0, 0.12)",
  black4: "rgba(0, 0, 0, 0.4)",
  blackOne: "rgba(0, 0, 0, 0.01)",

  cardGray: "#F3F3F3",
  cardGraynote: "#FAFAFA",
  textGrayLight: "#BABABA",

  shadowGray: "#EDEDED",
  textGray: "#373737",
  appYellow: "#FFDE2A",

  active: "#34A853",
  danger: "#D10000",
  success50: "#ECFDF3",
  logout: "#E23939",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  normal: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const FONT = {
  extraBold: "space500",
  semiBold: "space400",
  medium: "space300",
  regular: "space200",
  light: "space100",
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.blackTrans10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 8.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, FONT, SHADOWS };

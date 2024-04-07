import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { onSlides } from "../../components/constants/slides";
import { useContext, useRef, useState } from "react";
import OnboardingItem from "../../components/onboarding/OnboardingItem";
import Paginator from "../../components/Paginator";
import { COLORS } from "../../components/constants";
import { GlobalContext } from "../../context/context.service";

const OnboardingScreen = ({ navigation }) => {
  const refSlide = useRef(null);
  const { setToastValues, toastValues } = useContext(GlobalContext);

  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const proceedToPostBoarding = () => {
    navigation.replace("PostBoarding");
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetOfX = e.nativeEvent.contentOffset.x;
    const currentSlideIndex = Math.round(contentOffsetOfX / width);
    setCurrentSlide(currentSlideIndex);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={onSlides}
          horizontal
          pagingEnabled
          bounces={false}
          ref={refSlide}
          renderItem={(item) => <OnboardingItem item={item} />}
          onMomentumScrollEnd={updateCurrentSlideIndex}
        />
      </View>

      <Text
        onPress={proceedToPostBoarding}
        style={{
          position: "absolute",
          top: 60,
          left: 20,
          color: currentSlide === 1 ? COLORS.primary : COLORS.white,
        }}
      >
        Skip
      </Text>

      <Paginator
        data={onSlides}
        scrollX={currentSlide}
        refSlide={refSlide}
        setCurrentSlide={setCurrentSlide}
        navigation={navigation}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    position: "relative",
  },
  containerItem: {
    flex: 1,
    // height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.textGray,
  },
  imageItem: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  absoluteView: {
    position: "absolute",
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.white,
    fontFamily: "space500",
  },
  titleTextLight: {
    fontSize: 38,
    fontWeight: 300,
    color: COLORS.white,
    fontFamily: "space200",
  },
  descText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: "space200",
    marginTop: 20,
  },
});

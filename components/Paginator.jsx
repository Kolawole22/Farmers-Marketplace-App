import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "./constants";
import { AntDesign } from "@expo/vector-icons";

const Paginator = ({
  data,
  scrollX,
  setCurrentSlide,
  refSlide,
  navigation,
}) => {
  const { width } = useWindowDimensions();

  const proceedToPostBoarding = () => {
    navigation.replace("PostBoarding");
  };
  const goPrevSlide = () => {
    const prevSlideIndex = scrollX - 1;
    if (scrollX > 0) {
      const offset = prevSlideIndex * width;
      refSlide?.current?.scrollToOffset({ offset });
      setCurrentSlide(prevSlideIndex);
    }
  };
  const goNextSlide = () => {
    const nextSlideIndex = scrollX + 1;
    if (nextSlideIndex !== data.length) {
      const offset = nextSlideIndex * width;
      refSlide?.current?.scrollToOffset({ offset });
      setCurrentSlide(nextSlideIndex);
    }

    console.log(scrollX);
  };

  return (
    <View
      style={{
        width,
        position: "absolute",
        bottom: 20,
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10,
        gap: 0,
      }}
    >
      {scrollX === data.length ? (
        ""
      ) : (
        <View
          style={{
            flexDirection: "row",
            height: 64,
            alignItems: "center",
          }}
        >
          {data?.map((_, i) => {
            return (
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      scrollX === i ? COLORS.white : COLORS.whiteTrans,
                  },
                ]}
                key={i.toString()}
              />
            );
          })}
        </View>
      )}

      <View
        style={{
          // width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          // paddingHorizontal: 20,
          marginHorizontal: 20,
          marginBottom: 36,
          gap: 34,
        }}
      >
        {scrollX !== 0 && scrollX !== data.length - 1 && (
          <TouchableOpacity onPress={goPrevSlide} style={styles.prevBtn}>
            <Text style={styles.btnTxt}>Previous</Text>
          </TouchableOpacity>
        )}
        {scrollX === data.length - 1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              alignItems: "center",
              justifyContent: " center",
              borderRadius: 10,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={proceedToPostBoarding}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontFamily: "space300",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={goNextSlide} style={styles.nextBtn}>
            <Text style={styles.btnTxtNxt}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.ifad}>
        An IFAD Assisted LIFE-ND Project Initiative
      </Text>
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    marginHorizontal: 2,
    // backgroundColor: COLORS.white,
  },
  ifad: {
    color: COLORS.white,
    fontFamily: "space200",
    fontSize: 14,
  },
  nextBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 6,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  prevBtn: {
    borderRadius: 6,
    height: 48,
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    marginLeft: 20,
  },
  btnTxt: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "space300",
  },
  btnTxtNxt: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: "space300",
  },
});

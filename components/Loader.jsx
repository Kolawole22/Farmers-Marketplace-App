import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from './constants'
import LottieView from 'lottie-react-native'

const Loader = () => {
  return (
      <View
          style={{
              position: 'absolute',
              width: "100%",
              height :"100%",
              flex: 1,
              zIndex: 20,
              backgroundColor: COLORS.blackTrans80,
              alignItems: "center",
              justifyContent: "center"
        }}
      >
          {/* <LottieView
              source={require('../assets/lottie/LoadingAnimation.json')}
              autoPlay={true}
              loop
              colorFilters={[
                  {
                      keypath: 'button',
                      color: '#F00000',
                  },
                  {
                      keypath: 'Sending Loader',
                      color: '#F00000',
                  },
              ]}
              style={{
                  width:100,
                  height: 100,
                  backgroundColor:"yellow"
              }}
          /> */}
          <ActivityIndicator />
    </View>
  )
}

export default Loader 

const styles = StyleSheet.create({})

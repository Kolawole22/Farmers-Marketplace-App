import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from './constants'
import { ArrowSwapHorizontal } from 'iconsax-react-native'

const AgentTransactionCard = ({data}) => {
  return (
      <View style={a.card} >
          

          <View style={a.cardTop} >
              
              <View style={a.cardUsers} >
                  
                  
              {/* LEFT SIDE */}
                  <View style={a.cardUser} >
                      <View style={a.cardUserImg} >
                          <Image
                              source={require('../assets/images/userImg.png')}
                              style={{
                                  width: 48,
                                  height: 48
                              }}
                          />
                      </View>


                      <View style={a.cardNameFarm} >
                          <Text style={a.farmName} >FARMER </Text>
                          <Text style={a.userName} >Adams Doe</Text>
                      </View>
                  </View>
                  

                  <ArrowSwapHorizontal size="20" color={COLORS.input60} />

                  {/* RIGHT SIDE */}
                  <View style={a.cardUser} >
                      <View style={a.cardUserImg} >
                          <Image
                              source={require('../assets/images/userImg.png')}
                              style={{
                                  width: 48,
                                  height: 48
                              }}
                          />
                      </View>


                      <View style={a.cardNameFarm} >
                          <Text style={a.farmName} >FARMER </Text>
                          <Text style={a.userName} >Adams Doe</Text>
                      </View>
                  </View>


                  
              </View>

              <Text style={a.desc}>Adams Doe has approved a ale of 50kg bla blah</Text>

          </View>






          <View style={a.cardBottom} >
              
              <TouchableOpacity style={a.button}>
                  <Text style={a.buttonTxt}>Monitor Sale</Text>
              </TouchableOpacity>
              <Text style={a.time} >9:09am</Text>
          </View>
      
    </View>
  )
}

export default AgentTransactionCard

const a = StyleSheet.create({

    card: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: COLORS.input10
    },

    cardTop: {
        width: "100%",
        gap: 10
    },

    cardUsers: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    cardUser: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    cardNameFarm: {
        gap: 4
    },

    farmName: {
        color: COLORS.primary1,
        fontFamily: "montSBold",
        fontSize: 14
    },
    
    userName: {
        color: COLORS.input,
        fontFamily: "montSBold",
        fontSize: 16
    },

    desc: {
        color: COLORS.input80,
        fontFamily: "montReg",
        fontSize: 12
    },

    cardUserImg: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        overflow: "hidden"
    },



    cardBottom: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },

    button: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary1,
        borderRadius: 8
    },

    buttonTxt: {
        color: COLORS.white,
        fontFamily: "montSBold",
        fontSize: 14,
    },
    time: {
        color: COLORS.input80,
        fontFamily: "montReg",
        fontSize: 12
    },
})
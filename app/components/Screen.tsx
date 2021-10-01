import React from 'react'
import { StatusBar, View, StyleSheet, SafeAreaView, StyleProp, ViewStyle } from 'react-native'
import Constants from 'expo-constants'

interface IScreen {
  style?: StyleProp<ViewStyle>
}

export const Screen: React.FC<IScreen> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <StatusBar barStyle='dark-content' />
      <View style={[styles.view, style]}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  view: {
    flex: 1,
  }
})
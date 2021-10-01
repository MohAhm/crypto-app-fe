import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import colors from '../config/colors'
import defaultStyles from '../config/styles'

interface IAppTextInputProps {
  icon?: string
  [x: string]: any;
}

export const AppTextInput: React.FC<IAppTextInputProps> = ({ icon, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {
        icon && (
          <FontAwesome5 
            name={icon}
            size={20} 
            color={colors.dark}
            style={styles.icon}
          />
        )
      }

      <TextInput 
        placeholderTextColor={colors.dark}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },

  icon: {
    marginRight: 10,
  }
})
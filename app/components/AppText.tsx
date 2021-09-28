import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

import defaultStyles from '../config/styles'

interface IAppTextProps {
  style?: StyleProp<TextStyle>
}

export const AppText: React.FC<IAppTextProps> = ({ children, style, ...otherProps }) => {
  return <Text style={[defaultStyles.text, style]} {...otherProps}>{children}</Text>
}
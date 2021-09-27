import React from 'react'
import { Text } from 'react-native'
import { Screen } from '../components/Screen'

interface IDetailsScreenProps {}

export const DetailsScreen: React.FC<IDetailsScreenProps> = () => {
  return (
    <Screen>
      <Text>Coins Details page</Text>
    </Screen>
  )
}
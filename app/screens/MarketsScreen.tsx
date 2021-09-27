import React from 'react'
import { Button, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { Screen } from '../components/Screen'
import { TRootStackParamList } from './screensParamList'

type TDetailsScreenProp = StackNavigationProp<TRootStackParamList, 'CoinsDetails'>

interface IMarketsScreenProps {}

export const MarketsScreen: React.FC<IMarketsScreenProps> = () => {
  const navigation = useNavigation<TDetailsScreenProp>()

  return (
    <Screen>
      <Text>Coins</Text>
      <Button title="Details" onPress={() => navigation.navigate('CoinsDetails')} />
    </Screen>
  )
}
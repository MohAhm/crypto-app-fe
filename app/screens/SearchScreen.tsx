import React from 'react'
import { Text } from 'react-native'
import { Screen } from '../components/Screen'

interface ISearchScreenProps {}

export const SearchScreen: React.FC<ISearchScreenProps> = () => {
  return (
    <Screen>
      <Text>Search</Text>
    </Screen>
  )
}
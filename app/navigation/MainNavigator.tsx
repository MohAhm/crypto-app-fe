import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MarketsScreen } from '../screens/MarketsScreen'
import { DetailsScreen } from '../screens/DetailsScreen'
import { TRootStackParamList } from '../screens/screensParamList'

const Stack = createNativeStackNavigator<TRootStackParamList>()

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name='Exchanges' 
      component={MarketsScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name='Details' 
      component={DetailsScreen} 
      options={{
        title: 'Details',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
)

export default MainNavigator
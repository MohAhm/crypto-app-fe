import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'

import MainNavigator from './MainNavigator'
import { SearchScreen } from '../screens/SearchScreen'
import { TMainBottomTabParamList } from '../screens/screensParamList'

const Tab = createBottomTabNavigator<TMainBottomTabParamList>()

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name='Markets' 
      component={MainNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 
            name="globe" 
            size={size} 
            color={color}
          />
        )
      }}
    />
    <Tab.Screen 
      name='Search' 
      component={SearchScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 
            name="search" 
            size={size} 
            color={color}
          />
        )
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator
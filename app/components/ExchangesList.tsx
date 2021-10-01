import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { EXCHANGES, EXCHANGE_ICONS } from '../lib/graphql'
import { IExchangeData, IExchangeIcons, IExchanges } from '../lib/models'
import { TRootStackParamList } from '../screens/screensParamList'
import { AppText } from './AppText'
import { AppTextInput } from './AppTextInput'
import { ListItem } from './ListItem'
import { ListItemSeparator } from './ListItemSeparator'
import { Screen } from './Screen'

type TDetailsScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Details'>

interface IExchangesListProps {
  isSearchScreen?: boolean
}

export const ExchangesList: React.FC<IExchangesListProps> = ({ isSearchScreen = false }) => {
  const navigation = useNavigation<TDetailsScreenNavigationProp>()
  const [search, setSearch] = useState('')
  const [data, setData] = useState<IExchangeData[] | undefined>([])
  const { 
    loading: exchangesLoading, 
    error: exchangesError, 
    data: exchangesData 
  } = useQuery<IExchanges>(EXCHANGES)
  const { 
    loading: exchangeIconsLoading, 
    error: exchangeIconsError, 
    data: exchangeIconsData 
  } = useQuery<IExchangeIcons>(EXCHANGE_ICONS)

  const exchanges: IExchangeData[] | undefined = useMemo(() => 
    exchangesData?.exchanges.map((exchanges) => {
      const icons = exchangeIconsData?.exchangeIcons.find((icons) => exchanges.exchange_id === icons.exchange_id)
      return { ...icons, ...exchanges }
    }),
    [exchangeIconsData, exchangesData]
  )

  useEffect(() => {
    if (isSearchScreen) {      
      if (search.trim() !== '') {      
        const filterData = exchanges?.filter((exchange) => 
          exchange.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
  
        setData(filterData)
      } 
      else {
        setData([])
      }
    }
    else {
      setData(exchanges?.filter(x => x.volume_1day_usd > 0))
    }
  }, [exchanges, search])

  const renderItem = useCallback(
    ({ item }) => (
      <ListItem
        exchange_id={item.exchange_id}
        name={item.name}
        url={item.url}
        volume_1day_usd={item.volume_1day_usd}
        handlePress={() => navigation.navigate('Details', item.exchange_id)}
      />
    ),
    []
  )

  const keyExtractor = useCallback((exchange) => exchange.exchange_id, [])

  if (exchangesLoading || exchangeIconsLoading) {
    return (
      <Screen style={styles.container}>
        <AppText>Loading...</AppText>
      </Screen> 
    )
  }

  if (exchangesError || exchangeIconsError) {
    return (
      <Screen style={styles.container}>
        <AppText>Error: {exchangesError?.message ||exchangeIconsError?.message}</AppText>
      </Screen>
    )
  }

  return (
    <Screen style={styles.container}>
      {
        isSearchScreen && (
          <AppTextInput 
            icon="search"
            name="search"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder='Search exchanges'
            onChangeText={(text: string) => setSearch(text)}
          />
        )
      }

      <FlatList 
        data={data}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={renderItem} 
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
})
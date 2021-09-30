import React, { useMemo, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Screen } from '../components/Screen'
import { TRootStackParamList } from './screensParamList'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { IExchanges, IExchangeIcons } from '../lib/models'
import { ListItem } from '../components/ListItem'
import { ListItemSeparator } from '../components/ListItemSeparator'
import { AppText } from '../components/AppText'

type TDetailsScreenNavigationProp = NativeStackNavigationProp<TRootStackParamList, 'Details'>

const EXCHANGES = gql`
  query {
    exchanges {
      exchange_id
      name
      volume_1day_usd
    }
  }
`

const EXCHANGE_ICONS = gql`
  query {
    exchangeIcons {
      exchange_id
      url
    }
  }
`
 
interface IMarketsScreenProps {}

export const MarketsScreen: React.FC<IMarketsScreenProps> = () => {
  const navigation = useNavigation<TDetailsScreenNavigationProp>()
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

  // const data = exchangeIconsData?.exchangeIcons.map((icons) => {
  //   const exchanges = exchangesData?.exchanges.find((exchanges) => exchanges.exchange_id === icons.exchange_id)
  //   return { ...icons, ...exchanges }
  // })
  //   .filter(x => x.volume_1day_usd !== null && x.type_is_crypto)
  //   .sort((a, b) => Number(b.volume_1day_usd ) - Number(a.volume_1day_usd))
  
  const data = useMemo(() => 
    exchangesData?.exchanges.map((exchanges) => {
      const icons = exchangeIconsData?.exchangeIcons.find((icons) => exchanges.exchange_id === icons.exchange_id)
      return { ...icons, ...exchanges }
    })
      .filter(x => x.volume_1day_usd > 0), 
    [exchangeIconsData, exchangesData]
  )
  // console.log(data)
  // console.log('Exchanges', exchangeIconsData?.exchangeIcons.length)
  // console.log('Icons', exchangesData?.exchanges.length)
    
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
      <Screen style={styles.screen}>
        <AppText>Loading...</AppText>
      </Screen> 
    )
  }

  if (exchangesError || exchangeIconsError) {
    return (
      <Screen style={styles.screen}>
        <AppText>Error: {exchangesError?.message ||exchangeIconsError?.message}</AppText>
      </Screen>
    )
  }

  return (
    <Screen style={styles.screen}>
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
  screen: {
      padding: 10,
  },
})

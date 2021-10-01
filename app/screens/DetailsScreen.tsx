import { useQuery } from '@apollo/client'
import { RouteProp, useRoute } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, } from 'react-native'

import { Screen } from '../components/Screen'
import { TRootStackParamList } from './screensParamList'
import { IExchange } from '../lib/models'
import { AppText } from '../components/AppText'
import formatMony from '../lib/formatMony'
import { EXCHANGE, HISTORICAL_DATA, SYMBOL } from '../lib/graphql'

type TDetailsScreenRouteProp = RouteProp<TRootStackParamList, 'Details'>

export const DetailsScreen: React.FC = () => {
  const { params: exchange_id } = useRoute<TDetailsScreenRouteProp>()
  const { 
    loading: exchangeLoading, 
    error: exchangeError, 
    data: exchangeData 
  } = useQuery(EXCHANGE, { variables: { exchange_id } })
  const { 
    loading: symbolLoading, 
    error: symbolError, 
    data: symbolData 
  } = useQuery(SYMBOL, { variables: { exchange_id } })

  const symbol_id = symbolData?.symbol?.symbol_id

  const { 
    loading: historyLoading, 
    error: historyError, 
    data: historyData 
  } = useQuery(HISTORICAL_DATA, { 
    skip: !symbol_id,
    variables: { 
      symbol_id 
    } 
  })

  const exchange: IExchange = exchangeData?.exchange
  // console.log(exchange)

  // console.log('Test:', symbolData)

  if (exchangeLoading || symbolLoading) {
    return (
      <Screen style={styles.container}>
        <AppText>Loading...</AppText>
      </Screen>
    )
  }

  if (exchangeError || symbolError) {
    return (
      <Screen style={styles.container}>
        <AppText>Error: {exchangeError?.message || symbolError?.message}</AppText>
      </Screen>
    )
  }

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>
        {exchange.name} ({exchange.exchange_id})
      </AppText>
      <AppText style={styles.subTitle}>
        {formatMony(exchange.volume_1day_usd)}
      </AppText>

      {/* Chart */}


    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },

  title: {
    paddingVertical: 10,
  },
  
  subTitle: {
    fontWeight: '500',
    fontSize: 24
  },
})
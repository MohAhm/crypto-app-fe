import { useQuery } from '@apollo/client'
import { RouteProp, useRoute } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, } from 'react-native'
import { Screen } from '../components/Screen'
import { TRootStackParamList } from './screensParamList'
import gql from 'graphql-tag'
import { IExchange } from '../lib/models'
import { AppText } from '../components/AppText'
import formatMony from '../lib/formatMony'

type TDetailsScreenRouteProp = RouteProp<TRootStackParamList, 'Details'>

const EXCHANGE = gql`
  query EXCHANGE($exchange_id: ID!) {
    exchange(exchange_id: $exchange_id) {
      exchange_id
      name
      volume_1day_usd
    }
  }
`

const SYMBOL = gql`
  query SYMBOL($exchange_id: ID!) {
    symbol(exchange_id: $exchange_id) {
      symbol_id
      exchange_id
    }
  }
`

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

  const exchange: IExchange = exchangeData?.exchange
  // console.log(exchange)

  console.log('Test:', symbolData)

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
    padding: 7,
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
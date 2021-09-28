import React, { useMemo } from 'react'
import { Button, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { Screen } from '../components/Screen'
import { TRootStackParamList } from './screensParamList'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { IAssetIcons, IAssets } from '../lib/models'
import { ListItem } from '../components/ListItem'
import { ListItemSeparator } from '../components/ListItemSeparator'
import { AppText } from '../components/AppText'

// type TDetailsScreenProp = StackNavigationProp<TRootStackParamList, 'CoinsDetails'>

const ASSETS = gql`
  query {
    assets {
      asset_id
      name
      type_is_crypto
      volume_1hrs_usd
      price_usd
    }
  }
`

const ASSET_ICONS = gql`
  query {
    assetIcons {
      asset_id
      url
    }
  }
`

interface IMarketsScreenProps {}

export const MarketsScreen: React.FC<IMarketsScreenProps> = () => {
  // const navigation = useNavigation<TDetailsScreenProp>()
  const { 
    loading: assetsLoading, 
    error: assetsError, 
    data: assetsData 
  } = useQuery<IAssets>(ASSETS)
  const { 
    loading: assetIconsLoading, 
    error: assetIconsError, 
    data: assetIconsData 
  } = useQuery<IAssetIcons>(ASSET_ICONS)

  // const data = assetIconsData?.assetIcons.map((icons) => {
  //   const assets = assetsData?.assets.find((assets) => assets.asset_id === icons.asset_id)
  //   return { ...icons, ...assets }
  // })
  //   .filter(x => x.price_usd !== null && x.type_is_crypto)
  //   .sort((a, b) => Number(b.price_usd ) - Number(a.price_usd))
  
  const data = useMemo(() => 
    assetIconsData?.assetIcons.map((icons) => {
      const assets = assetsData?.assets.find((assets) => assets.asset_id === icons.asset_id)
      return { ...icons, ...assets }
    })
      .filter(x => x.price_usd !== null && x.type_is_crypto)
      .sort((a, b) => Number(b.price_usd ) - Number(a.price_usd)), 
    [assetsData, assetIconsData]
  )
  // console.log(data) 
  // console.log(data?.length)
    
  if (assetsLoading || assetIconsLoading) {
    return (
      <Screen>
        <AppText>Loading...</AppText>
      </Screen>
    )
  }

  if (assetsError || assetIconsError) {
    return (
      <Screen>
        <AppText>Error: {assetsError?.message || assetIconsError?.message}</AppText>
      </Screen>
    )
  }

  return (
    <Screen style={styles.screen}>
      <FlatList 
        data={data}
        keyExtractor={asset => asset.asset_id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem 
            asset_id={item.asset_id}
            name={item.name}
            url={item.url}
            price_usd={item.price_usd}
          />
        )}
      />
      {/* <Button title="Details" onPress={() => navigation.navigate('CoinsDetails')} /> */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
      padding: 10,
  },
})

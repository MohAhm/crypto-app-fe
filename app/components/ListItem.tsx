import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import colors from '../config/colors'
import { IAssetData } from '../lib/models'
import { AppText } from './AppText'
import { FontAwesome5 } from '@expo/vector-icons'
import formatMony from '../lib/formatMony'

interface IListItemProps extends IAssetData {
  handlePress?: () => void
}

export const ListItem: React.FC<IListItemProps> = ({ 
  asset_id, 
  name, 
  url, 
  price_usd,
}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={() => console.log("Test click...")}
    >
      <View style={styles.container}>
        {url && <Image style={styles.image} source={{ uri: url }}/>}

        <View style={styles.detailsContainer}>
          <AppText style={styles.primaryText}>{name}</AppText>
          <AppText style={styles.secondaryText}>{asset_id}</AppText>
        </View>

        <View style={styles.monyContainer}>
          <AppText style={styles.primaryText}>{price_usd ? formatMony(price_usd) : '--'}</AppText>
        </View>

        <FontAwesome5 name="chevron-right" size={18} color={colors.gray} />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
  },

  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  monyContainer: {
    marginRight: 10,
    alignItems: 'flex-end',
  },

  image: {
    width: 48,
    height: 48,
  },

  primaryText: {
    fontWeight: '500',
  },

  secondaryText: {
    color: colors.gray,
  }
})

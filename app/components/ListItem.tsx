import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import colors from '../config/colors'
import { IExchangeData } from '../lib/models'
import { AppText } from './AppText'
import { FontAwesome5 } from '@expo/vector-icons'
import formatMony from '../lib/formatMony'

interface IListItemProps extends IExchangeData {
  handlePress?: () => void
}

export const ListItem: React.FC<IListItemProps> = ({ 
  name, 
  url, 
  volume_1day_usd,
  handlePress
}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.light}
      onPress={handlePress}
    >
      <View style={styles.container}>
        {url && <Image style={styles.image} source={{ uri: url }}/>}

        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{name}</AppText>
        </View>

        <View style={styles.monyContainer}>
          <AppText style={styles.subTitle}>Volume(24h)</AppText>
          <AppText style={styles.title}>{formatMony(volume_1day_usd)}</AppText>
        </View>

        <FontAwesome5 name="chevron-right" size={12} color={colors.gray} />
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

  title: {
    fontWeight: '500',
  },

  subTitle: {
    fontSize: 14,
    color: colors.gray,
  }
})

const areEqual = (prevProps: IListItemProps, nextProps: IListItemProps) => {
  const { exchange_id } = nextProps;
  const { exchange_id: prevIsSelected } = prevProps;

  const isSelectedEqual = exchange_id === prevIsSelected;

  return isSelectedEqual;
};

export default React.memo(ListItem, areEqual)
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ALL_EXCHANGES = gql`
  query {
    exchanges {
      name
      exchange_id
      website
    }
  }
`

export default function AppTest() {
  const { loading, error, data } = useQuery(ALL_EXCHANGES)

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>; 
  }

  return (
    <View style={styles.container}>
      {data?.exchanges.map((item: any) => (
        <Text key={item.exchange_id}>{item.name}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

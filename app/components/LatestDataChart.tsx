import { useQuery } from '@apollo/client'
import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { LATEST_DATA } from '../lib/graphql'
import { EFormat, EPeriods, ILatestData } from '../lib/models'
import { LineChart } from 'react-native-chart-kit'
import { AppText } from './AppText'

dayjs.extend(utc)

interface ILatestDataChartProps {
  symbol_id: string
  period_id?: string
  limit?: number
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(12, 12, 12, ${opacity})`,
}

const screenWidth = Dimensions.get("window").width

function getChartData(dateScale: string[] | undefined, priceScale: number[] | undefined) {
  if (dateScale && priceScale) {    
    return {
      labels: dateScale,
      datasets: [
        {
          data: priceScale,
          color: (opacity = 1) => `rgba(0, 81, 255, ${opacity})`, 
          strokeWidth: 2, 

        }
      ],
      legend: ["Week"] 
    }
  }

  return null
}

export const LatestDataChart: React.FC<ILatestDataChartProps> = ({ 
  symbol_id, 
  period_id = EPeriods.DAY, 
  limit = 7 
}) => {
  const { loading, error, data } = useQuery<ILatestData>(LATEST_DATA, {
    skip: !symbol_id,
    variables: {
      symbol_id,
      period_id,
      limit,
    }
  })

  const dateScale = data?.latestData?.map(({ time_close }) => dayjs.utc(time_close).format(EFormat.DAY_OF_MONTH)).reverse() 
  const priceScale = data?.latestData?.map(({ price_close }) => price_close).reverse()
  const chartData = getChartData(dateScale, priceScale)

  if (loading) {
    return <AppText>Loading...</AppText>
  }

  if (error) {
    return <AppText>Error: {error.message}</AppText>
  }

  return (
    <View style={styles.container}>
      {
        chartData && (
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            horizontalLabelRotation={30}
            withDots={false}
            withVerticalLines={false}
            withHorizontalLines={false}
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
})
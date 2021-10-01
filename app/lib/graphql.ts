import gql from "graphql-tag"

export const EXCHANGES = gql`
  query {
    exchanges {
      exchange_id
      name
      volume_1day_usd
    }
  }
`

export const EXCHANGE_ICONS = gql`
  query {
    exchangeIcons {
      exchange_id
      url
    }
  }
`

export const EXCHANGE = gql`
  query EXCHANGE($exchange_id: ID!) {
    exchange(exchange_id: $exchange_id) {
      exchange_id
      name
      volume_1day_usd
    }
  }
`

export const SYMBOL = gql`
  query SYMBOL($exchange_id: ID!) {
    symbol(exchange_id: $exchange_id) {
      symbol_id
      exchange_id
    }
  }
`

export const HISTORICAL_DATA = gql`
  query HISTORICAL_DATA($symbol_id: ID!) {
    historicalData(symbol_id: $symbol_id) {
      time_period_start
      price_open
    }
  }
`
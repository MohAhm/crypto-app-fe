export interface IExchange {
  exchange_id: string
  name: string
  website?: string
  volume_1day_usd: number
}

export interface IExchanges { 
  exchanges: IExchange[]
}

export interface IExchangeIcons {
  exchangeIcons: {
    exchange_id: string
    url: string
  } []
}

export interface IExchangeData extends IExchange {
  url?: string
}

export interface ILatestData {
  latestData: {
    time_close: string
    price_close: number
  } []
}

export enum EFormat {
  TIME = 'HH:mm',
  DAY_OF_MONTH = 'D MMM',
  YEAR = 'YYYY',
}

export enum EPeriods {
  HRS = '1HRS',
  DAY = '1DAY',
  WEK = '7DAY',
  MTH = '1MTH',
  YRS = '1YRS',
}
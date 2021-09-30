export interface IExchange {
  exchange_id: string
  name: string
  website?: string
  volume_1day_usd: number
}

export interface IExchangeIcon {
  exchange_id: string
  url: string
}

export interface IExchanges { 
  exchanges: IExchange[]
}

export interface IExchangeIcons {
  exchangeIcons: IExchangeIcon[]
}

export interface IExchangeData extends IExchange {
  url?: string
}

export interface IAsset {
  asset_id: string
  name: string
  type_is_crypto?: boolean
  volume_1hrs_usd?: number
  price_usd: number | null
}

export interface IAssetIcon {
  asset_id: string
  url: string
}

export interface IAssets { 
  assets: IAsset[]
}

export interface IAssetIcons {
  assetIcons: IAssetIcon[]
}

export interface IAssetData extends IAsset {
  url?: string
}

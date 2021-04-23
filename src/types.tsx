export type WeatherSummaryType = {
  title: string
  description: string
  icon: string
}
export type WeatherTemperatureType = {
  actual: number
  feelsLike: number
  min: number
  max: number
}
export type WeatherWindType = {
  speed: number
  deg: number
}
export type WeatherCloudsType = {
  all: number
  visibility: number
  humidity: number
}

export type WeatherType = {
  summary: WeatherSummaryType
  temperature: WeatherTemperatureType
  wind: WeatherWindType
  clouds: WeatherCloudsType
  timestamp: number
}

export type CityType = {
  id: string
  name: string
  weather: WeatherType
}

export type UserGeolocationType = {
  coords?: {
    latitude: number | null
    longitude: number | null
  } | null
  city?: string | null
  error?: string | null
  isLoading: boolean
}

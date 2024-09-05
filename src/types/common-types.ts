export interface WeatherData {
  current: {
    temperature_2m: number
    weather_code: number
  }
  daily: {
    time: string[]
    weather_code: number[]
    precipitation_probability_max: number[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
  }
}

export interface WeatherDisplayProps {
  latitude: number
  longitude: number
}

export interface City {
  name: string
  country: string
  latitude: number
  longitude: number
}

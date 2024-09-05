import { useEffect, useState } from "react"
import { Card, Row, Col } from "antd"
import { WeatherData, WeatherDisplayProps } from "../types/common-types"
import axios from "axios"
import { getDayName, getWeatherStatus } from "../lib/helpers"
import WeatherIcon from "./weather-icon"

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude,
            longitude,
            current: "temperature_2m,weather_code",
            daily: "weather_code,precipitation_probability_max,temperature_2m_max,temperature_2m_min",
            timezone: "auto",
            forecast_days: 7
          }
        })
        setWeatherData(response.data)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeatherData()
  }, [latitude, longitude])

  if (!weatherData) return <div>Loading...</div>

  return (
    <Card title="Weather Forecast">
      <p>Temperature: {weatherData.current.temperature_2m}°C</p>
      <p>Status: {getWeatherStatus(weatherData.current.weather_code).text}</p>

      <Row gutter={[16, 16]}>
        {weatherData.daily.time.map((day, index) => (
          <Col span={8} key={day}>
            <Card size="small">
              <p>{getDayName(day)}</p>
              <WeatherIcon iconCode={getWeatherStatus(weatherData.daily.weather_code[index]).icon} />
              <p>Precipitation: {weatherData.daily.precipitation_probability_max[index]}%</p>
              <p>{weatherData.daily.temperature_2m_min[index]}°C</p>
              <p>{weatherData.daily.temperature_2m_max[index]}°C</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default WeatherDisplay

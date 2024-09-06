import { WeatherData, WeatherDisplayProps } from "../types/common-types"
import { fetcher, getDayName, getWeatherStatus } from "../lib/helpers"
import WeatherIcon from "./weather-icon"
import { Chart } from "./chart"
import { useModal } from "../hooks/use-modal"
import { useSelectedCity } from "../hooks/use-selected-city"
import useSWR from "swr"

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ latitude, longitude }) => {
  const { setIsModalVisible } = useModal()
  const { selectedCity } = useSelectedCity()

  const { data: weatherData, error } = useSWR<WeatherData>(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,precipitation_probability_max,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`,
    fetcher
  )

  if (error) return <div>Error loading weather data</div>
  if (!weatherData) return <div>Loading...</div>

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsModalVisible(true)}>
        {selectedCity ? selectedCity.name : "Select a city"}
      </div>
      <p>Temperature: {weatherData.current.temperature_2m}°C</p>
      <p>Status: {getWeatherStatus(weatherData.current.weather_code).text}</p>

      {weatherData.daily.time.map((day, index) => (
        <div key={index}>
          <p>{getDayName(day)}</p>
          <WeatherIcon iconCode={getWeatherStatus(weatherData.daily.weather_code[index]).icon} />
          <p>Precipitation: {weatherData.daily.precipitation_probability_max[index]}%</p>
          <p>{weatherData.daily.temperature_2m_min[index]}°C</p>
          <p>{weatherData.daily.temperature_2m_max[index]}°C</p>
        </div>
      ))}

      <Chart weather={weatherData} />
    </>
  )
}

export default WeatherDisplay

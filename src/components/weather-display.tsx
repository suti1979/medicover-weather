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
    <div className="grid lg:grid-cols-[1fr_2fr] gap-8 p-4 lg:p-8">
      <div className="flex flex-col justify-between">
        <div>
          <p className="cursor-pointer text-[12px]" onClick={() => setIsModalVisible(true)}>
            {selectedCity ? selectedCity.name : "Select a city"}
          </p>
          <p className="text-[48px]">{weatherData.current.temperature_2m} °C</p>
          <p>{getWeatherStatus(weatherData.current.weather_code).text}</p>
        </div>

        <p className="cursor-pointer text-[12px] hidden lg:block">Zöld András</p>
      </div>
      <div>
        <p className="cursor-pointer text-[12px]">{weatherData.daily.time.length} napos előrejelzés</p>
        {weatherData.daily.time.map((day, index) => (
          <div key={index} className="grid  grid-cols-[3fr_2fr_5fr] lg:grid-cols-3 text-[16px] lg:text-[20px] my-4">
            <p>{getDayName(day)}</p>

            <p className="flex justify-center items-center gap-1 lg:gap-2">
              <WeatherIcon iconCode={getWeatherStatus(weatherData.daily.weather_code[index]).icon} />

              <span className="">{weatherData.daily.precipitation_probability_max[index]} %</span>
            </p>
            <p className="text-right space-x-1 lg:space-x-2">
              <span>{weatherData.daily.temperature_2m_min[index]} °C</span>
              <span>/</span>
              <span>{weatherData.daily.temperature_2m_max[index]} °C</span>
            </p>
          </div>
        ))}

        <Chart weather={weatherData} />
        <p className="cursor-pointer text-[12px] block lg:hidden text-center mt-5">Zöld András</p>
      </div>
    </div>
  )
}

export default WeatherDisplay

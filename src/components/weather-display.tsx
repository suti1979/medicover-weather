import { WeatherData, WeatherDisplayProps } from "../types/common-types"
import { fetcher, getDayName, getWeatherStatus } from "../lib/helpers"
import WeatherIcon from "./weather-icon"
import { Chart } from "./chart"
import { useModal } from "../hooks/use-modal"
import { useSelectedCity } from "../hooks/use-selected-city"
import useSWR from "swr"
import Footer from "./footer"

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
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4 lg:gap-8 p-4 lg:p-8">
        <div id="left-side-main-info" className="flex flex-col justify-between">
          <div>
            <p className="cursor-pointer text-[12px]" onClick={() => setIsModalVisible(true)}>
              {selectedCity ? selectedCity.name : "Select a city"}
            </p>
            <p className="text-[48px]">{weatherData.current.temperature_2m} °C</p>
            <p>{getWeatherStatus(weatherData.current.weather_code).text}</p>
          </div>
        </div>
        <div id="right-side-detailed-infos">
          <p className="cursor-pointer text-[12px]">{weatherData.daily.time.length} napos előrejelzés</p>
          {weatherData.daily.time.map((day, index) => (
            <div key={index} className="grid  grid-cols-[1fr_1fr_2fr] md:grid-cols-3 text-[16px] lg:text-[20px] my-4">
              <p id="week-day">{getDayName(day)}</p>
              <div id="icons-and-precipitation" className="flex justify-center">
                <p className="flex justify-between gap-1 lg:gap-2 w-[70px] lg:w-[90px]">
                  <WeatherIcon iconCode={getWeatherStatus(weatherData.daily.weather_code[index]).icon} />
                  <span>{weatherData.daily.precipitation_probability_max[index]} %</span>
                </p>
              </div>
              <p id="min-max-temp" className="text-right space-x-1 lg:space-x-2">
                <span>{weatherData.daily.temperature_2m_min[index]} °C</span>
                <span>/</span>
                <span>{weatherData.daily.temperature_2m_max[index]} °C</span>
              </p>
            </div>
          ))}
          <Chart weather={weatherData} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default WeatherDisplay

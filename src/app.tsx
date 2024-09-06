import { useState, useEffect } from "react"
import { Modal, Input, List } from "antd"
import WeatherDisplay from "./components/weather-display"
import { City } from "./types/common-types"
import { useModal } from "./hooks/use-modal"
import { useSelectedCity } from "./hooks/use-selected-city"
import useSWR from "swr"
import debounce from "lodash/debounce"
import { fetcher } from "./lib/helpers"

const DEBOUNCE_TIME_ON_KEY_PRESS = import.meta.env.VITE_DEBOUNCE_TIME_ON_KEY_PRESS || 1000

function App() {
  const { isModalVisible, setIsModalVisible } = useModal()
  const { selectedCity, setSelectedCity } = useSelectedCity()
  const [searchTerm, setSearchTerm] = useState("")

  console.log("de", DEBOUNCE_TIME_ON_KEY_PRESS)

  useEffect(() => {
    if (!selectedCity) {
      setIsModalVisible(true)
    }
  }, [selectedCity, setIsModalVisible])

  const { data, error, isLoading } = useSWR(
    searchTerm
      ? `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`
      : null,
    fetcher
  )

  const cities: City[] = data?.results || []

  const handleSearch = () => {
    setSearchTerm(searchTerm)
  }

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)
    setIsModalVisible(false)
  }

  if (error) return <div>Error fetching cities</div>

  return (
    <div className="container m-auto">
      <Modal
        title={selectedCity ? "Search for a city" : "First you need to select a city"}
        open={isModalVisible}
        onCancel={() => {
          if (selectedCity) {
            setIsModalVisible(false)
          }
        }}
        footer={null}
      >
        <Input.Search
          loading={isLoading}
          placeholder="Enter city name"
          onSearch={handleSearch}
          onChange={debounce((e) => setSearchTerm(e.target.value), DEBOUNCE_TIME_ON_KEY_PRESS)}
          size="large"
          allowClear
          enterButton
        />
        <List
          itemLayout="horizontal"
          dataSource={cities}
          renderItem={(city) => (
            <List.Item onClick={() => handleCitySelect(city)} className="cursor-pointer">
              <List.Item.Meta title={city.name} description={`${city.country} (${city.latitude}, ${city.longitude})`} />
            </List.Item>
          )}
        />
      </Modal>
      {selectedCity && <WeatherDisplay latitude={selectedCity.latitude} longitude={selectedCity.longitude} />}
    </div>
  )
}

export default App

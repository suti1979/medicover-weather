import { useState, useEffect } from "react"
import { Modal, Input, List } from "antd"
import axios from "axios"
import WeatherDisplay from "./components/weather-display"
import { City } from "./types/common-types"

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity")
    if (storedCity) {
      setSelectedCity(JSON.parse(storedCity))
    } else {
      setIsModalVisible(true)
    }
  }, [])

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`
      )
      setCities(response.data.results || [])
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const handleCitySelect = (city: City) => {
    setSelectedCity(city)
    localStorage.setItem("selectedCity", JSON.stringify(city))
    setIsModalVisible(false)
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsModalVisible(true)}>
        {selectedCity ? selectedCity.name : "Select a city"}
      </div>

      <Modal title="Search for a city" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Input.Search
          placeholder="Enter city name"
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
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
    </>
  )
}

export default App

interface WeatherIconProps {
  iconCode: number
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const getIcon = (code: number): string => {
    switch (code) {
      case 0:
        return "☀️"
      case 1:
        return "⛅"
      case 2:
        return "🌫️"
      case 3:
        return "🌧️"
      case 4:
        return "❄️"
      case 5:
        return "🌦️"
      case 6:
        return "🌨️"
      case 7:
        return "⚡"
      default:
        return "❓"
    }
  }

  return (
    <span role="img" aria-label="weather icon">
      {getIcon(iconCode)}
    </span>
  )
}

export default WeatherIcon

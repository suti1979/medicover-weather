interface WeatherIconProps {
  iconCode: number
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const getIcon = (code: number): JSX.Element => {
    switch (code) {
      case 0:
        return <i className="wi wi-day-sunny" />
      case 1:
        return <i className="wi wi-day-cloudy " />
      case 2:
        return <i className="wi wi-day-fog" />
      case 3:
        return <i className="wi wi-day-rain" />
      case 4:
        return <i className="wi wi-day-snow" />
      case 5:
        return <i className="wi wi-day-rain-mix" />
      case 6:
        return <i className="wi wi-day-snow-wind" />
      case 7:
        return <i className="wi wi-day-lightning" />
      default:
        return <i className="wi wi-na" />
    }
  }

  return (
    <span role="img" aria-label="weather icon">
      {getIcon(iconCode)}
    </span>
  )
}

export default WeatherIcon

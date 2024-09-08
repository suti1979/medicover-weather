import { chartsGridClasses, LineChart, lineElementClasses, LineSeriesType } from "@mui/x-charts"
import { WeatherData } from "../types/common-types"

type ChartProps = {
  weather?: WeatherData
}

export const Chart: React.FC<ChartProps> = ({ weather }) => {
  const maxTemperatures = weather?.daily.temperature_2m_max ?? []
  const days = weather?.daily.time ?? []

  const series: LineSeriesType[] = [
    {
      label: "C°",
      type: "line",
      data: maxTemperatures,
      showMark: false,
      color: "#fff"
    }
  ]

  return (
    <div className="border border-white rounded-[25px] mt-10">
      <LineChart
        series={series}
        height={300}
        slotProps={{ legend: { hidden: true } }}
        margin={{
          top: 40,
          right: 0,
          bottom: 0,
          left: 0
        }}
        xAxis={[{ scaleType: "point", data: days, disableLine: true, disableTicks: true }]}
        yAxis={[{ disableLine: true }]}
        axisHighlight={{ x: "none" }}
        grid={{ horizontal: true }}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "#fff",
            strokeWidth: 2
          },
          [`& .${chartsGridClasses.line}`]: {
            stroke: "rgb(255, 255, 255, 0.5)",
            strokeWidth: 1
          }
        }}
      />
    </div>
  )
}

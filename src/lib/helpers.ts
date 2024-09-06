export const getWeatherStatus = (code: number) => {
  if (code === 0) return { text: "Tiszta égbolt", icon: 0 }
  if (code >= 1 && code <= 3) return { text: "Részben felhős", icon: 1 }
  if (code >= 45 && code <= 48) return { text: "Köd", icon: 2 }
  if (code >= 51 && code <= 67) return { text: "Eső", icon: 3 }
  if (code >= 71 && code <= 77) return { text: "Hó", icon: 4 }
  if (code >= 80 && code <= 82) return { text: "Záporeső", icon: 5 }
  if (code >= 85 && code <= 86) return { text: "Hóvihar", icon: 6 }
  if (code >= 95) return { text: "Villámlás", icon: 7 }
  return { text: "Ismeretlen", icon: 8 }
}

export const getDayName = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("hu-EN", { weekday: "long" })
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

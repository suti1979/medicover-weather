import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { City } from "../types/common-types"

type SelectedCityStore = {
  selectedCity: City | null
  setSelectedCity: (city: City | null) => void
}

export const useSelectedCity = create<SelectedCityStore>()(
  persist(
    (set) => ({
      selectedCity: null,
      setSelectedCity: (city) => set({ selectedCity: city })
    }),
    {
      name: "selected-city",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

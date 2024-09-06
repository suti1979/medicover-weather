import { create } from "zustand"

type ModalStore = {
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
}

export const useModal = create<ModalStore>((set) => ({
  isModalVisible: false,
  setIsModalVisible: (isModalVisible) => set({ isModalVisible })
}))

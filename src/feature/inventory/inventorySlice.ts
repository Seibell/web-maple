import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EquipItemType, InventoryType, SlotType } from 'types/inventory'
import { v4 as uuid } from 'uuid'
export type InventoryState = {
  currentInventory: InventoryType
  inventory: Record<InventoryType, SlotType[]>
  equipNum: number
  equipMaxNum: number
  currentItem?: EquipItemType
}

const equipInven: SlotType[] = []
const emptyInven: SlotType[] = []
for (let i = 0; i < 30; i++) {
  const item = undefined
  const newSlot: SlotType = { id: uuid(), item, isOpen: i < 24 ? true : false }
  emptyInven.push({ id: uuid(), isOpen: i < 24 ? true : false })
  equipInven.push(newSlot)
}

const initInventory: Record<InventoryType, SlotType[]> = {
  Equip: equipInven,
  Use: emptyInven,
  Etc: emptyInven
}

const initialState: InventoryState = {
  currentInventory: 'Equip',
  inventory: initInventory,
  equipNum: 18,
  equipMaxNum: 24,
  currentItem: undefined
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryType>) => {
      state.currentInventory = action.payload
    },
    addEquipment: (state, action: PayloadAction<SlotType>) => {
      const newSlot = action.payload
      const newInven = state.inventory[state.currentInventory].map((slot) => {
        if (slot.id === newSlot.id) {
          return newSlot
        } else {
          return slot
        }
      })
      state.inventory[state.currentInventory] = [...newInven]
    },
    removeEquipItem: (state, action: PayloadAction<string>) => {
      const newInven = state.inventory[state.currentInventory].map((slot) => {
        if (slot.id === action.payload) {
          return { ...slot, item: undefined }
        } else {
          return slot
        }
      })
      state.inventory[state.currentInventory] = [...newInven]
    },
    increaseEquipMaxNum: (state) => {
      if (state.equipMaxNum >= 50) return
      state.equipMaxNum += 4
      const newInven = [...state.inventory[state.currentInventory]]
      for (let index = 0; index < 4; index++) {
        newInven.push({
          id: uuid(),
          isOpen: false
        })
      }
      state.inventory[state.currentInventory] = newInven
    },
    openEquipInventory: (state) => {
      let check = false
      const newInven = [...state.inventory[state.currentInventory]].map(
        (slot) => {
          if (check === false && slot.isOpen === false) {
            check = true
            return { ...slot, isOpen: true }
          }
          return slot
        }
      )
      state.inventory[state.currentInventory] = newInven
    },
    setCurrentItem: (
      state,
      action: PayloadAction<EquipItemType | undefined>
    ) => {
      state.currentItem = action.payload
    },
    updateInventorySlot: (state, action: PayloadAction<{ slot: SlotType }>) => {
      const newInven = [...state.inventory[state.currentInventory]].map(
        (slot) => {
          if (slot.id === action.payload.slot.id) {
            return action.payload.slot
          }
          return slot
        }
      )
      state.inventory[state.currentInventory] = newInven
    },
    sortInventory: (state) => {
      const newInven = [...state.inventory[state.currentInventory]].sort(
        (a, b) => {
          if (a.item === undefined && b.item !== undefined) {
            return 1
          } else if (a.item !== undefined && b.item === undefined) {
            return -1
          } else if (a.item === undefined && b.item === undefined) {
            return 0
          } else if (a.item !== undefined && b.item !== undefined) {
            if (a.item.islots > b.item.islots) {
              return 1
            } else if (a.item.islots < b.item.islots) {
              return -1
            } else {
              return 0
            }
          } else {
            return 0
          }
        }
      )

      state.inventory[state.currentInventory] = [...newInven]
    },
    switchSlot: (
      state,
      action: PayloadAction<{ startSlot: SlotType; nextSlot: SlotType }>
    ) => {
      const startSlot = action.payload.startSlot
      const nextSlot = action.payload.nextSlot
      if (!startSlot.isOpen || !nextSlot.isOpen) return
      const newInven = state.inventory[state.currentInventory].map((slot) => {
        if (slot.id === startSlot.id) {
          return { ...slot, item: nextSlot.item }
        } else if (slot.id === nextSlot.id) {
          return { ...slot, item: startSlot.item }
        } else {
          return slot
        }
      })
      state.inventory[state.currentInventory] = [...newInven]
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setInventory,
  addEquipment,
  setCurrentItem,
  switchSlot,
  sortInventory,
  increaseEquipMaxNum,
  openEquipInventory,
  removeEquipItem,
  updateInventorySlot
} = inventorySlice.actions

export default inventorySlice.reducer

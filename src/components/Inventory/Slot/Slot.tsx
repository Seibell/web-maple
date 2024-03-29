import Item2 from 'components/Item/Item'
import { EquipSlotType } from 'domains/EquipmentStore/types/equipment.types'
import useEquipment from 'hooks/useEquipment'
import useInventory from 'hooks/useInventory'
import useToolTip from 'hooks/useToolTip'
import React from 'react'
import { useDrop } from 'react-dnd'
import { SlotType } from 'types/inventory'
import * as S from './style'

type SlotProps = {
  slot: SlotType
  onDrop: (slot: any) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isMySlot?: (
    start: SlotType | EquipSlotType,
    end?: SlotType | EquipSlotType
  ) => boolean
  isCanDrop?: boolean
  className?: string
}
const Slot: React.FC<SlotProps> = ({
  slot,
  onDrop,
  isMySlot,
  onClick,
  isCanDrop,
  className
}) => {
  let timer: any = undefined
  const { equipment, onSetEquip } = useEquipment()
  const { onRemoveEquipItem, onAddEquipment } = useInventory()
  const { onHideTooltip } = useToolTip()
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'item',
    drop: onDrop,
    // drop: (item, monitor) => onDrop(monitor),
    canDrop: (item: SlotType) =>
      isCanDrop || (isMySlot ? isMySlot(item, slot) : checkIsMySlot(item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const checkIsMySlot = (item: SlotType) => {
    return true
    // if (
    //   (item.item && item.item.islots === slot.item?.islots) ||
    //   slot.item === undefined
    // ) {
    //   return true
    // }
    // return false
  }

  // const isMySlot = (item: any) => {
  //   if (item.id === slot.id) {
  //     return false
  //   }
  //   return true
  // }

  const isActive = () => {
    const isActive = isOver && canDrop
    let result = ''
    if (isActive) {
      result += ' isActive'
    } else if (canDrop) {
      result += ' canDrop'
    }
    return result
  }
  const isOpen = () => {
    return slot.isOpen ? 'isOpen' : 'isClosed'
  }

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    clearTimeout(timer)
    if (event.detail === 1) {
      timer = setTimeout(() => {
        console.log('싱글 클릭')
      }, 200)
    } else if (event.detail === 2) {
      // if (slot.item) {
      //   const currentEquipSlot = equipment.find(
      //     (equip) => equip.slotType === slot.item?.islots
      //   )
      //   onRemoveEquipItem(slot.id)
      //   if (currentEquipSlot && currentEquipSlot?.item) {
      //     onAddEquipment({
      //       ...slot,
      //       item: currentEquipSlot?.item
      //     })
      //   }
      //   onSetEquip(slot.item.islots, slot.item)
      //   onHideTooltip()
      // }
    }
  }

  return (
    <S.Container
      ref={drop}
      role="Dustbin"
      onClick={onClick || onClickHandler}
      className={`${className ? className : ''} ${isActive()} ${isOpen()}`}
    >
      {slot.item?.id !== '' && <Item2 slot={slot} canDrag={isCanDrop} />}
    </S.Container>
  )
}

export default Slot

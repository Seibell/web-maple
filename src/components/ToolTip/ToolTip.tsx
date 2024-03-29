import useInventory from 'hooks/useInventory'
import useToolTip from 'hooks/useToolTip'
import useUser from 'hooks/useUser'
import React from 'react'
import { StatusBase } from 'types/inventory'
import IMAGE from 'utils/images'
import { canStarForce } from '../StarForce/constants'
import * as S from './style'

type ToolTipProps = {
  positionX: number
  positionY: number
}
const ToolTip: React.FC<ToolTipProps> = ({ positionX, positionY }) => {
  const { currentItem } = useInventory()
  const { mouseX, mouseY, visible, onSetMousePosition } = useToolTip()
  const { getStatAttack } = useUser()

  if (!currentItem || !visible) return null

  const {
    job,
    categoryName,
    category,
    star,
    STR,
    DEX,
    INT,
    LUK,
    HP,
    MP,
    jump,
    speed,
    DEFENCE,
    AllStat,
    WEAPON_ATTACK,
    MAGIC_ATTACK,
    maxStar,
    upgrade,
    max_upgrade,
    upgrade_avalable,
    IgnoreDefence,
    bossDemage,
    demage,
    RequierdLevel
  } = currentItem

  // const position = {
  //   top: `0px`,
  //   left: `0px`
  // }

  const position = {
    top: `${mouseY + 3}px`,
    left: `${mouseX + 3}px`
  }

  // const position = {
  //   top: positionY,
  //   left: positionX
  // }

  // const itemGrade = () => {}

  const renderItemInfo = () => {
    return (
      <div className="tooltip-frame-line-img">
        <div className="tooltip-image">
          <S.Horizontal
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <div className="item-icon-base">
              <img
                alt="item-icon-base"
                src={IMAGE.tooltip.tooltip_Item_Icon_base}
              />
              <div className="tooltip-item-img-content">
                <img
                  className="tooltip-item-img"
                  src={currentItem.image}
                  alt="item-img"
                />
                <img
                  className="item-icon-cover"
                  alt="item-cover"
                  src={IMAGE.tooltip.tooltip_Item_Icon_cover}
                />
              </div>
            </div>
            <S.AttackIncreaseWrapper>
              <S.AttackIncreaseLabel>공격력 증가량</S.AttackIncreaseLabel>
              <S.AttackIncrease>{getStatAttack(currentItem)}</S.AttackIncrease>
            </S.AttackIncreaseWrapper>
          </S.Horizontal>
        </div>
      </div>
    )
  }

  const renderRequierdLevel = (status: StatusBase) => {
    if (status.base + status.bonus + status.reinforce === 0) return
    return (
      <S.Status>
        <span className="chu-color">
          {status.label} : {status.base + status.bonus + status.reinforce}
        </span>
      </S.Status>
    )
  }

  const renderStatus = (status: StatusBase) => {
    if (status.base + status.bonus + status.reinforce === 0) return
    return (
      <S.Status>
        <span
          className={`${
            (status.bonus > 0 || status.reinforce > 0) && 'add-color'
          }`}
        >
          {status.label} : +{status.base + status.bonus + status.reinforce}{' '}
        </span>
        {(status.bonus > 0 || status.reinforce > 0) && (
          <>
            ({status.base}
            {status.bonus > 0 && (
              <span className="chu-color"> +{status.bonus}</span>
            )}
            {status.reinforce > 0 && (
              <span className="add-color"> +{status.reinforce}</span>
            )}
            )
          </>
        )}
      </S.Status>
    )
  }

  const renderStatusRate = (status: StatusBase) => {
    if (status.base + status.bonus + status.reinforce === 0) return
    return (
      <S.Status>
        <span
          className={`${
            (status.bonus > 0 || status.reinforce > 0) && 'add-color'
          }`}
        >
          {status.label} : +{status.base + status.bonus + status.reinforce}%{' '}
        </span>
        {(status.bonus > 0 || status.reinforce > 0) && (
          <>
            ({status.base}%
            {status.bonus > 0 && (
              <span className="chu-color"> +{status.bonus}%</span>
            )}
            {status.reinforce > 0 && (
              <span className="add-color"> +{status.reinforce}%</span>
            )}
            )
          </>
        )}
      </S.Status>
    )
  }

  const renderStar = () => {
    const result = []
    for (let i = 0; i < maxStar; i++) {
      // const starImage =
      // currentItem.isSuperior
      //   ? IMAGE.tooltip.tooltip_Item_Star_blue
      //   : IMAGE.tooltip.tooltip_Item_Star
      const imageSrc =
        i < star
          ? IMAGE.tooltip.tooltip_Item_Star
          : IMAGE.tooltip.tooltip_Item_Star_none
      result.push(
        <img src={imageSrc} key={`star-${i}`} width={13} alt={`starimg-` + i} />
      )
      if (i % 5 === 4 && i !== maxStar - 1) {
        result.push(<span key={`space-${i}`} style={{ marginRight: 6 }} />)
      }
      if (i === 14 && i !== maxStar - 1) {
        result.push(
          <div
            key={`linebreak-${i}`}
            style={{ height: '100%', paddingBottom: 20 }}
          />
        )
      }
    }
    return result
  }

  const setMousePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const tooltip = document.getElementById('new-tooltip')?.getClientRects()[0]

    let newX = event.clientX
    let newY = event.clientY
    if (
      document.body.clientWidth <
      event.clientX + (tooltip?.width || 300) + 3
    ) {
      newX = document.body.clientWidth - (tooltip?.width || 300) - 3
    }
    if (
      document.body.clientHeight <
      event.clientY + (tooltip?.height || 0) + 3
    ) {
      newY = document.body.clientHeight - (tooltip?.height || 0) - 3
    }
    onSetMousePosition(newX, newY)
  }

  return (
    <S.Container
      id="new-tooltip"
      style={position}
      onMouseEnter={setMousePosition}
      onMouseMove={setMousePosition}
    >
      {canStarForce(currentItem) && (
        <S.StarWrapper>{renderStar()}</S.StarWrapper>
      )}
      <S.ItemNameWapper>
        <S.ItemName>
          {currentItem.name}
          {currentItem.isDestroyed && '의 흔적'}
          {currentItem.upgrade > 0 && <span> (+{currentItem.upgrade})</span>}
        </S.ItemName>
        {/* <S.ItemPotential>(에픽 아이템)</S.ItemPotential> */}
      </S.ItemNameWapper>
      <S.DotLine />
      <S.SectionBlock
        justifyContent="center"
        flexDirection="row"
        alignItems="flex-start"
      >
        <S.ImageWrapper>
          <S.Image
            isDestroyed={currentItem.isDestroyed}
            src={currentItem.image}
          />
        </S.ImageWrapper>
        <S.AttackIncreaseWrapper>
          <S.AttackIncreaseLabel>공격력 증가량</S.AttackIncreaseLabel>
          <S.AttackIncrease>{getStatAttack(currentItem)}</S.AttackIncrease>
        </S.AttackIncreaseWrapper>
      </S.SectionBlock>
      <S.DotLine />
      <S.SectionBlock
        justifyContent="center"
        flexDirection="column"
        alignItems="flex-start"
      >
        <S.StatusWrapper>
          <div className="tooltip-category">분류 : {categoryName}</div>
          {renderStatus(STR)}
          {renderStatus(DEX)}
          {renderStatus(INT)}
          {renderStatus(LUK)}
          {renderStatus(HP)}
          {renderStatus(MP)}
          {renderStatus(DEFENCE)}
          {renderStatus(speed)}
          {renderStatus(jump)}
          {renderStatus(WEAPON_ATTACK)}
          {renderStatus(MAGIC_ATTACK)}
          {renderStatusRate(bossDemage)}
          {renderStatusRate(IgnoreDefence)}
          {renderStatusRate(demage)}
          {renderStatusRate(AllStat)}
          {renderRequierdLevel(RequierdLevel)}
          {upgrade_avalable > 0 && upgrade_avalable !== undefined && (
            <div className="tooltip-upgrade">
              업그레이드 가능 횟수 : {upgrade_avalable}{' '}
              <span className="yellow-color">
                (복구 가능 횟수 : {max_upgrade - upgrade - upgrade_avalable})
              </span>
            </div>
          )}
        </S.StatusWrapper>
      </S.SectionBlock>
    </S.Container>
  )
}

export default ToolTip

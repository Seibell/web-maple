import { Checkbox as OriginalCheckbox } from 'antd/lib'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  gap: 10px;
`

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 190px;
  width: 270px;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(120, 120, 120, 0.95);
  border-radius: 5px;
  padding: 10px;
  color: #e1e2e3;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border: 1px solid #9a722e;
  border-radius: 5px;
  flex-direction: row;
  font-weight: bold;
  color: #fff8ed;
  padding: 4px 10px;
  cursor: pointer;
  background-color: #f4af38;

  &:hover {
    background-color: #ffc96b;
  }
  &.disabled {
    color: #948c7d;
    background-color: #635949;
    border: 1px solid #443f38;
    cursor: not-allowed;
  }
`

export const Checkbox = styled(OriginalCheckbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    /* background-color: #f4af38;
    border-color: #f4af38; */
  }
`
export const Title = styled.div`
  font-weight: bold;
  color: #eeeeee;
`

export const FlameStatLabel = styled.div<{ isMyStat?: boolean }>`
  ${(props) =>
    props.isMyStat
      ? {
          fontWeight: 'bold',
          color: '#66ff64'
        }
      : {}}
`

export const DetailWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
`
export const FlameBonusDetailLabel = styled.span<{ grade: number }>`
  ${(props) =>
    props.grade === 1
      ? {
          fontWeight: 'bold',
          color: '#ff6246'
        }
      : {}}
`

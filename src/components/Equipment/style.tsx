import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  width: 300px;
  height: fit-content;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffcc5f;
  padding: 10px 0;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
  justify-content: center;
  background-color: #eeeeeee7;
`
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px 10px 10px;
  /* background-color: #eeeeeee7; */
  justify-content: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 20px 10px 0px 10px;
  flex-direction: row;
  border-bottom: 2px solid #ffc156;
`
export const StyledButton = styled.button`
  display: flex;
  border-top: 1px solid #9a722e;
  border-right: 1px solid #9a722e;
  border-left: 1px solid #9a722e;
  border-bottom: unset;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex-direction: row;
  font-weight: bold;
  color: #fff8ed;
  padding: 4px 10px;
  cursor: pointer;
  background-color: #a0a0a0;

  &:hover {
    background-color: #b5b5b5;
  }

  &.isActive {
    background-color: #f4af38;

    &:hover {
      background-color: #ffc96b;
    }
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 350px;
  gap: 10px;
  border-radius: 5px;
  padding: 10px;
`

export const Horizontal = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  display: flex;
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

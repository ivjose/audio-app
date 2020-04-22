import React from "react";
import styled from "@emotion/styled";

const Styled = {
  Wrapper: styled.div`
    position: relative;
    margin-left: 20px;
    padding: 10px;
    display: inline-block;
    ul {
      display: none;
    }
    &:hover {
      ul {
        display: block;
      }
    }
  `,
  MenuText: styled.div`
    font-size: 14px;
  `,

  Menu: styled.ul`
    background-color: ${(props) => props.theme.colors.lighterGray};
    width: 35px;
    padding: 5px 0;
    margin: 0;
    margin-left: 5px;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 0px #cdcdcd;
    li {
      list-style: none;
      text-align: center;
      div {
        font-size: 11px;
        padding: 2px 5px;
        font-weight: 600;
        display: block;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.colors.lightGray};
        }
      }
    }
  `,
};

const MenuDropdown = ({ option, text, onClick }) => {
  return (
    <Styled.Wrapper>
      <Styled.MenuText>{text}</Styled.MenuText>

      <Styled.Menu>
        {option.map((menu) => (
          <li key={menu.value}>
            <div onClick={() => onClick(menu.value)}>{menu.label}</div>
          </li>
        ))}
      </Styled.Menu>
    </Styled.Wrapper>
  );
};

export default MenuDropdown;

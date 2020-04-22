import React from "react";
import styled from "@emotion/styled";

const searchIcon = `${process.env.PUBLIC_URL}/assets/svg/icon-search.svg`;

const Styled = {
  Wrapper: styled.div`
    width: 400px;
    margin: 1em;
    position: relative;
    display: inline-block;
  `,
  Icon: styled.img`
    width: 20px;
    height: 20px;
    margin-left: 10px;
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1;
  `,
  Input: styled.input`
    width: 100%;
    font-size: 1em;
    padding: 10px 40px;
    margin: 0;
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  `,
};

const SearchBox = ({ ...props }) => {
  return (
    <Styled.Wrapper>
      <Styled.Icon src={searchIcon} alt="search icon" />
      <Styled.Input type="text" name="search" id="search" {...props} />
    </Styled.Wrapper>
  );
};

export default SearchBox;

import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) =>
    props.primary ? props.theme.colors.primary : props.theme.colors.white};
  color: ${(props) =>
    props.primary ? props.theme.colors.white : props.theme.colors.secondary};
  font-weight: 600;
  font-size: 1em;
  margin: 0;
  padding: 0.5em 1em;
  border: 1px solid
    ${(props) =>
      props.primary
        ? props.theme.colors.primary
        : props.theme.colors.lightGray};
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

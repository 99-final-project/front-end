import React from "react";
import styled from "styled-components";

const SmallFilterButton = (props) => {
  const { children, active, _onClick } = props;

  const styles = { active };

  return (
    <Button {...styles} onClick={_onClick}>
      {children}
    </Button>
  );
};

SmallFilterButton.defalutProps = {
  active: false,
  _onClick: () => {},
};

const Button = styled.button`
  padding: 8px;
  font-size: 12px;
  color: #767676;
  ${(props) => props.active && `color : #000; font-weight : 500`};
`;

export default SmallFilterButton;

import styled from "styled-components";
import OrangeButton from "./OrangeButton";
import React from "react";

interface ModifiedButtonProps {
  checked: boolean;
}

const ModifiedOrangeButton = styled(OrangeButton)<ModifiedButtonProps>`
  font-weight: 600;
  width: 90%;
  margin: 20px;
  background-color: ${({ checked }) => (checked ? "#FF9B3F" : "#ADADAD")};
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
  checked: boolean;
}

const ExtendedOrangeButton: React.FC<ButtonProps> = ({ text, onClick, checked}) => (
  <ModifiedOrangeButton text={text} onClick={onClick} checked={checked} />
);

export default ExtendedOrangeButton;
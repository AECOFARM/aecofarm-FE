import styled from "styled-components";
import OrangeButton from "./OrangeButton";
import React from "react";

const ModifiedOrangeButton = styled(OrangeButton)`
  font-weight: 600;
  width: 90%;
  margin: 20px;
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const ExtendedOrangeButton: React.FC<ButtonProps> = ({ text, onClick}) => (
  <ModifiedOrangeButton text={text} onClick={onClick} />
);

export default ExtendedOrangeButton;
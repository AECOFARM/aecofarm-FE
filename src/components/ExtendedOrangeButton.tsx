import styled from "styled-components";
import OrangeButton from "./OrangeButton";
import React from "react";

interface ModifiedButtonProps {
  checked: boolean;
  disabled: boolean;
}

const ModifiedOrangeButton = styled(OrangeButton)<ModifiedButtonProps>`
  font-weight: 600;
  width: 90%;
  margin: 20px;
  background-color: ${({ checked }) =>
    checked
      ? "${({ theme }) => theme.colors.orange2}"
      : "${({ theme }) => theme.colors.gray4}"};
`;

interface ButtonProps {
  text: string;
  onClick: () => void;
  checked: boolean;
  disabled: boolean;
}

const ExtendedOrangeButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  checked,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <ModifiedOrangeButton
      text={text}
      padding={13}
      onClick={handleClick}
      checked={checked}
      disabled={disabled}
    />
  );
};

export default ExtendedOrangeButton;

import styled from "styled-components";
import { NextPage } from "next";

interface ButtonProps {
  width?: number;
  padding: number;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  fullWidth?: boolean;
}

const ButtonStyle = styled.button<ButtonProps>`
  width: ${(props) =>
    props.fullWidth ? "100%" : props.width ? props.width + "px" : "auto"};
  padding: ${(props) => props.padding + "px"};
  border: none;
  border-radius: 10px;
  color: white;
  background-color: var(--orange2);
  font-size: 16px;
  cursor: pointer;
`;

const OrangeButton: NextPage<ButtonProps> = ({
  width,
  padding,
  text,
  onClick,
  className,
  fullWidth = false, 
}) => {
  return (
    <ButtonStyle
      width={width}
      padding={padding}
      onClick={onClick}
      className={className}
      fullWidth={fullWidth} 
    >
      {text}
    </ButtonStyle>
  );
};

export default OrangeButton;

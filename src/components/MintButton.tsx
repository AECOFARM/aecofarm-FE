import styled from "styled-components";
import { NextPage } from "next";

const Button = styled.button`
  width: 100%;
  padding: 13px;
  border-radius: 30px;
  border: 0px;
  color: white;
  background-color: var(--mint);
  font-size: 18px;
  font-weight: 500;
`;

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const MintButton: NextPage<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <Button onClick={onClick} className={className}>
      {text}
    </Button>
  );
};

export default MintButton;

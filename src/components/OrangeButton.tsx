import styled from 'styled-components';
import { NextPage } from 'next';

const Button = styled.button`
  width: 310px;
  padding: 13px;
  border-radius: 10px;
  border: 0px;
  color: white;
  background-color: #FF9B3F;
  font-size: 16px;
`;

interface ButtonProps {
  text: string;
}

const OrangeButton: NextPage<ButtonProps> = ({ text }) => {
  return <Button>{text}</Button>;
};

export default OrangeButton;

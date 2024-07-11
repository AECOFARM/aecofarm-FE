import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--gray6);
  background-color: #FFFFFF;
  font-size: 1rem;
  color: var(--gray6);
  outline: 0;
  &::placeholder {
    color: var(--gray4);
  }
`;

interface TextInputProps {
    placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder }) => {
  return (
    <Input type = "text" placeholder={placeholder} />
  );
};

export default TextInput;
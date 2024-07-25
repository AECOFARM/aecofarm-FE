import styled from "styled-components";
import React, { useRef } from "react";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input.attrs(props => ({
  required: props.required
}))`
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: 1px solid var(--gray6);
  background: none;
  z-index: 5;
  font-size: 1rem;
  color: var(--gray6);
  outline: 0;
  &:placeholder {
    color: var(--gray4);
  }

  &:focus {
    outline: none;
  }

  &:focus + label, &:valid + label {
    font-size: 0.8rem;
    top: -5px;
    color: var(--gray6);
    font-weight: bold;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  color: var(--gray4);
  left: 0px;
  font-size: 1rem;
  top: 20px;
  transition: all 0.2s;
  cursor: pointer;
`;

const ExampleLabel = styled.label`
  position: absolute;
  color: var(--gray8);
  right: 0px;
  font-size: 1rem;
  top: 20px;
`;


interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  required?: boolean;
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, value, onChange, name, type, required, label }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const handleTextInput = () => {
    if(textInputRef.current) {
      textInputRef.current.focus();
    }
  }

  return (
    <InputContainer>
      <Input value={value} onChange={onChange} name={name} ref={textInputRef} type={type} required={required} />
      <InputLabel htmlFor={value} onClick={handleTextInput}>{placeholder}</InputLabel>
      <ExampleLabel>{label}</ExampleLabel>
    </InputContainer>
  );
};

export default TextInput;
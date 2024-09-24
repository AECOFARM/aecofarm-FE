import styled from "styled-components";
import React, { useRef } from "react";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input.attrs((props) => ({
  required: props.required,
}))`
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  background: none;
  z-index: 5;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray6};
  outline: 0;
  &:placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }

  &:focus {
    outline: none;
  }

  &:focus + label,
  &:valid + label {
    font-size: 0.8rem;
    top: -5px;
    color: ${({ theme }) => theme.colors.gray6};
    font-weight: bold;
  }
  /* Remove arrows in input[type="number"] for Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove arrows in input[type="number"] for Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray4};
  left: 0px;
  font-size: 1rem;
  top: 20px;
  transition: all 0.2s;
  cursor: pointer;
`;

const ExampleLabel = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray8};
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

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  name,
  type,
  required,
  label,
}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const handleTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.preventDefault();
    }
  };

  return (
    <InputContainer>
      <Input
        value={value}
        onChange={onChange}
        name={name}
        ref={textInputRef}
        type={type}
        required={required}
        onWheel={handleWheel}
      />
      <InputLabel htmlFor={value} onClick={handleTextInput}>
        {placeholder}
      </InputLabel>
      <ExampleLabel>{label}</ExampleLabel>
    </InputContainer>
  );
};

export default TextInput;

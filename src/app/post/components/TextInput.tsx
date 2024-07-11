import styled from "styled-components";
import React, { useState, useEffect } from "react";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input.attrs({ required: true })`
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
  cursor: text;
`;

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, value, onChange, name }) => {
  return (
    <InputContainer>
      <Input type="text" value={value} onChange={onChange} name={name} required/>
      <InputLabel>{placeholder}</InputLabel>
    </InputContainer>
  );
};

export default TextInput;

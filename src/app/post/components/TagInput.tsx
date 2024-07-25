import styled from 'styled-components';
import React, { useState, useCallback, useEffect, useRef } from 'react';

interface TagInputProps {
  placeholder?: string;
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ placeholder, onChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleTagInput = () => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeHashtag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  }, []);

  const handleTagRemove = useCallback((tagToRemove: string) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag !== tagToRemove);
      onChange(newTags);
      return newTags;
    });
  }, [onChange]);

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && hashTag.trim() !== '') {
        setTags((prevTags) => {
          const newTags = [...prevTags, hashTag];
          onChange(newTags);
          return newTags;
        });
        setHashTag('');
      }
    },
    [hashTag, onChange]
  );

  const updateLabelStyle = useCallback(() => {
    if (labelRef.current) {
      if (hashTag.trim() !== '' || (inputRef.current && inputRef.current === document.activeElement)) {
        labelRef.current.style.fontSize = '0.8rem';
        labelRef.current.style.top = '-5px';
        labelRef.current.style.color = 'var(--gray6)';
        labelRef.current.style.fontWeight = 'bold';
      } else {
        labelRef.current.style.fontSize = '1rem';
        labelRef.current.style.top = '20px';
        labelRef.current.style.color = 'var(--gray4)';
        labelRef.current.style.fontWeight = 'normal';
      }
    }
  }, [hashTag]);

  useEffect(() => {
    const inputElement = inputRef.current;

    if(inputElement) {
      inputElement.addEventListener('focus', updateLabelStyle);
      inputElement.addEventListener('blur', updateLabelStyle);
    }

    updateLabelStyle();

    return () =>{
      if (inputElement) {
        inputElement.removeEventListener('focus', updateLabelStyle);
        inputElement.removeEventListener('blur', updateLabelStyle);
      }
    }
  }, [hashTag, updateLabelStyle]);

  return (
    <HashWrapOuter className='HashWrapOuter'>
        <HashInput 
            type='text'
            value={hashTag}
            onChange={onChangeHashtag}
            onKeyUp={onKeyUp}
            ref={inputRef}
        />
        {tags.map((tag, index) => (
          <HashWrapInner key={index} onClick={() => handleTagRemove(tag)}>
            #{tag}
          </HashWrapInner>
        ))}
        <InputLabel ref={labelRef} onClick={handleTagInput}>{placeholder}</InputLabel>
    </HashWrapOuter>
  );
};

const HashWrapOuter = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 500px;
  width: 100%;
  gap: 10px;
`;

const HashWrapInner = styled.div`
  font-size: 0.9rem;
  background-color: var(--white);
  color: var(--orange2);
  gap: 0px;
  padding: 5px 10px;
  border: 1px solid var(--orange2);
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  &:hover {
    background-color: var(--orange2);
    border: 1px solid var(--orange2);
    color: var(--white);
  }
`;

const HashInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--gray6);
  width: 100%;
  height: 60px;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: var(--gray6);

  &::placeholder {
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

export default TagInput;

import styled from 'styled-components';
import React, {useCallback, useState} from 'react';

interface TagInputProps {
    value: { value: string }[];
    onChange: (e: CustomEvent) => void;
    settings?: any;
    placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ value = [], onChange, settings, placeholder }) => {
  const [hashTag, setHashTag] = useState<string>('');
  const [hashArr, setHashArr] = useState<string[]>(value.map(tag => tag.value));

  const onChangeHashtag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  }, []);

  const handleTagRemove = useCallback((tagToRemove: string) => {
    setHashArr((prevHashArr) => {
      const updatedHashArr = prevHashArr.filter((tag) => tag !== tagToRemove);
      onChange(new CustomEvent('change', { detail: { value: updatedHashArr.map(tag => ({ value: tag })) } }));
      return updatedHashArr;
    });
  }, [onChange]);

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && hashTag.trim() !== '') {
        setHashArr((prevHashArr) => {
          const newHashArr = [...prevHashArr, hashTag];
          onChange(new CustomEvent('change', { detail: { value: newHashArr.map(tag => ({ value: tag })) } }));
          return newHashArr;
        });
        setHashTag('');
      }
    },
    [hashTag, onChange]
  );

  return (
    <HashWrapOuter className='HashWrapOuter'>
        <HashInput
            type='text'
            value={hashTag}
            onChange={onChangeHashtag}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
        />
        {hashArr.map((tag, index) => (
          <HashWrapInner key={index} onClick={() => handleTagRemove(tag)}>
            #{tag}
          </HashWrapInner>
        ))}
    </HashWrapOuter>
  );
};

const HashWrapOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 500px;
  width: 100%;
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
  margin: 5px;
`;

const HashInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--gray6);
  width: 100%;
  height: 50px;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: var(--gray6);

  &::placeholder {
    color: var(--gray4);
  }
`;


export default TagInput;
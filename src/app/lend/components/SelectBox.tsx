import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 140px;
  padding-left: 20px;
  z-index: 100;
`;

interface SelectListProps {
  show: boolean;
}

const SelectList = styled.ul<SelectListProps>`
  list-style-type: none;
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  width: 120px;
  top: 42px;
  left: 0;
  margin: 0 0 0 20px;
  padding: 0;
  border: 1px solid var(--gray4);
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 7px 10px;
  border: none;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: black;

  &:hover,
  &:focus {
    background-color: var(--orange0);
  }
`;

interface SelectButtonProps {
  $show: boolean;
}

const SelectButton = styled.button<SelectButtonProps>`
  width: 100%;
  padding: 13px 30px 13px 14px;
  font-size: 15px;
  line-height: 14px;
  background-color: white;
  border: 1px solid var(--gray4);
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  position: relative; /* relative positioning for the arrow */
  transition: border-color 0.3s, outline 0.3s; /* Smooth transition for border and outline */

  &:hover,
  &:focus {
    border: 1px solid var(--orange2);
    outline: 3px solid var(--orange0);
  }

  &::after {
    content: '';
    position: absolute;
    right: 14px; /* Adjust to your padding */
    top: 50%;
    transform: translateY(-40%) rotate(0deg); /* Default rotation */
    border: 5px solid transparent;
    border-top-color: var(--orange1); /* Color of the triangle */
    transition: transform 0.3s; /* Smooth rotation transition */
  }

  /* Rotate the triangle when the options are shown */
  ${({ $show }) => $show && `
    &::after {
      transform: translateY(-80%) rotate(180deg);
    }
  `}
`;


const OptionList = styled.li`
  padding: 3px 5px;
  margin: 0 3px;
  color: black;
`;

interface SelectBoxProps {
  onChange: (sortType: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectClick = () => {
    setShowOptions(prevShowOptions => !prevShowOptions);
  };

  const handleOptionClick = (option: string, sortType: string) => {
    setSelectedOption(option);
    setShowOptions(false);
    onChange(sortType);
  };

  return (
    <Container>
      <SelectButton className="btn-select" onClick={handleSelectClick} $show={showOptions}>
        {selectedOption}
      </SelectButton>
      <SelectList className="list-member" show={showOptions}>
        <OptionList>
          <OptionButton onClick={() => handleOptionClick('최신순', 'NEWEST')}>최신순</OptionButton>
        </OptionList>
        <OptionList>
          <OptionButton onClick={() => handleOptionClick('낮은 가격순', 'PRICE_ASC')}>낮은 가격순</OptionButton>
        </OptionList>
        <OptionList>
          <OptionButton onClick={() => handleOptionClick('높은 가격순', 'PRICE_DESC')}>높은 가격순</OptionButton>
        </OptionList>
      </SelectList>
    </Container>
  );
};

export default SelectBox;

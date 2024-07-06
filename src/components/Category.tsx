import styled from "styled-components";
import React, { useCallback } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  background-color: #FFFFFF;
`;

const CategoryContainer = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#FF9C3A" : "#FFFFFF")};
  border: ${({ isSelected }) => (isSelected ? "1px solid #FF9C3A" : "1px solid #717171")};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "none" : "#EBEBEB")};
  }
  p {
    color: ${({ isSelected }) => (isSelected ? "#FFFFFF" : "#717171")};
    font-size: 0.9rem;
  }
`;

const categories = ["전체", "대여하기", "기부하기", "빌려주기"];

interface CategoryProps {
  selectedCategory: string;
  onSelectCategory:  (category: string) => void;
}

const Category: React.FC<CategoryProps> = React.memo(({selectedCategory, onSelectCategory}) => {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryContainer
          key={category}
          isSelected={selectedCategory === category}
          onClick={() => onSelectCategory(category)}
          >
            <p>{category}</p>
          </CategoryContainer>
      ))}
    </Container>
  );
});
    
export default Category;    
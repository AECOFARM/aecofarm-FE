import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 5px;
  background-color: #FFFFFF;
  position: relative;
  width: auto;
  height: auto;
`;

const ItemImage = styled.div`
  background-color: var(--gray2);
  border-radius: 10px;
  width: 100px;
  height: 100px;
  aspect-ratio: 1 / 1; /* Width와 Height를 동일하게 유지 */
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
`;

const Price = styled.div`
  background-color: var(--gray2);
  border-radius: 5px;
  height: 0.75rem;
  width: 30%;
`;

const Time = styled.div`
  background-color: var(--gray2);
  border-radius: 5px;
  height: 0.75rem;
  width: 50%;
`;

const ItemTitle = styled.div`
  background-color: var(--gray2);
  width: 100%;
  height: 0.8rem;
  border-radius: 5px;
`;

const SkeletonMyItemListItem = () => {
    return (
      <ItemContainer>
        <ItemImage />
        <ItemTitle />
        <ItemInfoContainer>
          <Price></Price>
          <Time></Time>
        </ItemInfoContainer>
      </ItemContainer>
    );
}

export default SkeletonMyItemListItem;
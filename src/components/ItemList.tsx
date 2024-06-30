import styled from 'styled-components';
import { NextPage } from 'next';

const ItemContainer = styled.div`
  img {
    border-radius: 10px;
    width: 7rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-right: 15px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  p {
    color: #686868;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .time {
    color: #000000;
  }
  .price {
    color: #DF5532;
  }
`;

const ItemTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  color: #686868;
`;

interface Props {
  img: string;
  price: string;
  time: number;
  title: string;
}

const ItemList: NextPage<Props> = ({ img, price, time, title }) => {
  return (
    <ItemContainer>
      <img src = {img} alt = "item" />
      <ItemInfoContainer>
        <p className='price'>{price}</p>
        <p>|</p>
        <p className='time'>{time}시간 대여</p>
      </ItemInfoContainer>
      <ItemTitle>{title}</ItemTitle>
    </ItemContainer>
  )
}

export default ItemList;
  
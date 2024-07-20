import React, {useCallback, useState, useEffect} from "react";
import styled from "styled-components";
import AlarmListItem from "./AlarmListItem";
import Category from "@/components/Category";
import { CategoryItemsContainer } from "@/components/CommonStyles";
import axios from "axios";

const Container = styled.div`
  display: block;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 95%;
`;

const CategoryContainer = styled.div`
  position: fixed;
  top: 110px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const AlarmContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

interface Alarm {
    status: string;
    userName: string;
    memberStatus: string;
    contractId: number;
    itemName: string;
    image: string;
    time: Date;
}

interface AlarmList {
    lending: Alarm[];
    borrowing: Alarm[];
}

const AlarmList: React.FC<AlarmList> = () => {
    const categories = ["전체", "대여하기", "빌려주기"];
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alarmList, setAlarmList] = useState<AlarmList>({lending: [], borrowing: []});

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    useEffect(() => {
      const fetchAlarm = async() => {
        setError(null);
        setLoading(true);
        try {
          const response = await axios.get('/api/alarm/list', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data.data;
          setAlarmList(data);
        } catch (err) {
          setError(err.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };
      fetchAlarm();
    }, [token]);

    const filteredData = selectedCategory === "전체"
      ? [
        ...alarmList.lending.map((item) => ({ ...item, category: "lending" })),
        ...alarmList.borrowing.map((item) => ({ ...item, category: "borrowing" }))
      ]
      : selectedCategory === "빌려주기"
      ? alarmList.lending.map((item) => ({ ...item, category: "lending" }))
      : alarmList.borrowing.map((item) => ({ ...item, category: "borrowing" }));

    return (
        <Container>
            <CategoryContainer>
                <Category
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                categories={categories}
                />
            </CategoryContainer>
            <CategoryItemsContainer>
                <AlarmContainer>
                    {filteredData.map((alarm, index) => (
                        <AlarmListItem key={index} alarm={alarm} category={alarm.category}/>
                        
                    ))}
                </AlarmContainer>
            </CategoryItemsContainer>
        </Container>
    );
}

export default AlarmList;
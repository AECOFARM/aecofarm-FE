'use client';
import React, { useCallback, useState, useEffect } from "react";
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

interface AlarmListData {
    lending: Alarm[];
    borrowing: Alarm[];
}

const AlarmList: React.FC = () => {
    const categories = ["전체", "대여하기", "빌려주기"];
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alarmList, setAlarmList] = useState<AlarmListData>({ lending: [], borrowing: [] });

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    useEffect(() => {
        const fetchAlarm = async () => {
            setError(null);
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('로그인 후 시도해주세요.');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('/api/alarm/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.data;
                setAlarmList(data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
                } else {
                    setError('데이터를 가져오는 데 실패했습니다.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAlarm();
    }, []);

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
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div style={{ color: 'red' }}>{error}</div>
                    ) : (
                        filteredData.map((alarm, index) => (
                            <AlarmListItem key={index} alarm={alarm} category={alarm.category} />
                        ))
                    )}
                </AlarmContainer>
            </CategoryItemsContainer>
        </Container>
    );
}

export default AlarmList;

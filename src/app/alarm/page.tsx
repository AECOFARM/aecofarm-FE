'use client'
import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { Wrapper } from "@/components/CommonStyles";
import AlarmList from "./components/AlarmList";
import axios from "axios";

const Alarm = () => {
    const [alarmList, setAlarmList] = useState({ lending: [], borrowing: [] });

    useEffect(() => {
      const fetchAlarm = async() => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/alarm/list', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data.data;
          setAlarmList(data);
        } catch (err) {
          console.error(err.message || 'Something went wrong');
        }
      };
      fetchAlarm();
    }, []);

    return (
        <Wrapper>
            <AlarmList alarmList={alarmList} />
        </Wrapper>
    );
}

export default Alarm;

'use client'
import React from "react";
import { Wrapper } from "@/components/CommonStyles";
import AlarmList from "./components/AlarmList";

const Alarm: React.FC = () => {
    return (
        <Wrapper>
            <AlarmList />
        </Wrapper>
    );
}

export default Alarm;

'use client'
import React, {useState, useCallback} from "react"
import styled from "styled-components"
import { Wrapper } from "@/components/CommonStyles";
import AlarmList from "./components/AlarmList";

const Alarm = () => {

    return (
        <Wrapper>
            <AlarmList />
        </Wrapper>
    );
}

export default Alarm;
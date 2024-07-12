"use client"
import React from "react"
import styled from "styled-components"
import { Wrapper } from "@/components/CommonStyles"
import ClubList from "./components/ClubList"

const Club = () => {
  return (
    <Wrapper>
      <ClubList></ClubList>
    </Wrapper>
  );
};


export default Club;
"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLayout from "@/components/layout/MobileLayout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import OrangeButton from "@/components/OrangeButton";

const ImageContainer = styled.div`
  align-items: center;
  width: 100%;
  max-width: 300px;

  padding-top: 160px;
  margin: 0 auto;

  div {
    font-size: 27px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`/api/lend/list?sortType=${sortType}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setPosts(result.data);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    router.push(`/intro`);
  };

  return (
    <AppLayout>
      <Header />
      <MainLayout>
        <ImageContainer>
          <Image
            src={"/img/404-logo.svg"}
            width={300}
            height={300}
            alt="404 Error"
          />
          <div>
            서비스 이용에 불편을 드려 <br />
            죄송합니다
          </div>
          <OrangeButton
            padding={13}
            text="메인으로"
            onClick={handleClick}
            fullWidth={400}
          />
        </ImageContainer>
      </MainLayout>
      <Navigation />
    </AppLayout>
  );
};

export default ErrorPage;

import React from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: 10px 10px;
  display: flex;
  max-width: 480px;
  width: 100%;
  justify-content: center;
`;

const SkeletonImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray2};
`;

const SkeletonInfo = styled.div`
  width: 75%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SkeletonTitle = styled.div`
  width: 72%;
  height: 19px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
`;

const SkeletonText = styled.div`
  width: 100%;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
`;

const SkeletonTags = styled.div`
  display: flex;
  gap: 5px;
`;

const SkeletonTag = styled.div`
  width: 50px;
  height: 13px;
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
`;

const SkeletonPost = (): JSX.Element => (
  <SkeletonContainer>
    <SkeletonImage />
    <SkeletonInfo>
      <SkeletonTitle />
      <SkeletonText style={{ width: "50%" }} />
      <SkeletonText style={{ width: "70%" }} />
      <SkeletonTags>
        <SkeletonTag />
        <SkeletonTag />
        <SkeletonTag />
      </SkeletonTags>
    </SkeletonInfo>
  </SkeletonContainer>
);

export default SkeletonPost;

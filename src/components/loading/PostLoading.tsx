import React from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    Z-index: 9999;
`;

const LoadingIconContainer = styled.div`
    background-color: var(--white);
    width: 120px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid var(--gray4);
`;

const LoadingIcon = styled.img`
    width: 30px;
    fill: var(--gray4);
`;

const PostLoading = () => {
    return (
        <Container>
            <LoadingIconContainer>
                <LoadingIcon src="/loading.gif" alt="loading" />
            </LoadingIconContainer>
        </Container>
    ); 
}

export default PostLoading;
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
    width: 100%;
    height: 35vh; // 17.5vw를 1920px 너비 기준으로 변환
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        height: 192px; // 25vw를 768px 너비 기준으로 변환
    }
`;

const BannerP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 30.72px; // 1.6vw를 1920px 너비 기준으로 변환

    @media (max-width: 768px) {
        font-size: 30.72px; // 4vw를 768px 너비 기준으로 변환
    }
`;

const Banner = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem("userNickname");
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        // 사용자 정보 제거
        localStorage.removeItem("userToken");
        localStorage.removeItem("userNickname");
        // 상태 업데이트
        setUsername('');
    };

    return (
        <BannerContainer>
            <BannerP>{username ? `${username}님 환영합니다` : "환영합니다"}</BannerP>
        </BannerContainer>
    );
};

export default Banner;

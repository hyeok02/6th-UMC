import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
    width: 100%;
    height: 17.5vw;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.6vw;
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

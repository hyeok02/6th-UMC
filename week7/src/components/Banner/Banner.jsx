import React from "react";
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
    // 로컬 스토리지에서 사용자 이름을 가져온다.
    const signupLogs = localStorage.getItem("signupLogs");
    const username = signupLogs ? JSON.parse(signupLogs).username : "";

    return (
        <BannerContainer>
            <BannerP>{username ? `${username}님 환영합니다` : "환영합니다"}</BannerP>
        </BannerContainer>
    );
};

export default Banner;
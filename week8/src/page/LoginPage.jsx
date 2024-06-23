import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/Style/PageStyle";
import InputLogin from "../components/Login/Login";

const LoginP = styled.p`
    font-size: 19.2px; // 1vw를 1920px 기준으로 변환
    color: white;
    font-weight: bold;
    margin-top: 53.76px; // 2.8vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        font-size: 57.6px; // 3vw를 768px 기준으로 변환
        margin-top: 38.4px; // 5vw를 768px 기준으로 변환
    }
`;

const LoginContainer = styled.div`
    margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    width: 608.64px; // 31.7vw를 1920px 기준으로 변환
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 38.4px; // 2vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        width: 80%;
        gap: 57.6px; // 4vw를 768px 기준으로 변환
    }

    @media (max-width: 480px) {
        width: 90%;
        gap: 86.4px; // 6vw를 480px 기준으로 변환
    }
`;

const LoginButton = styled.button`
    width: 100%;
    height: 57.6px; // 3vw를 1920px 기준으로 변환
    border: none;
    border-radius: 48px; // 2.5vw를 1920px 기준으로 변환
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    font-size: 23.04px; // 1.2vw를 1920px 기준으로 변환
    color: black;
    font-weight: bold;

    @media (max-width: 768px) {
        height: 61.44px; // 8vw를 768px 기준으로 변환
        font-size: 57.6px; // 3vw를 768px 기준으로 변환
        border-radius: 76.8px; // 5vw를 768px 기준으로 변환
    }

    @media (max-width: 480px) {
        height: 48px; // 10vw를 480px 기준으로 변환
        font-size: 57.6px; // 4vw를 480px 기준으로 변환
        border-radius: 72px; // 6vw를 480px 기준으로 변환
    }
`;

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (id && password) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/auth/login",
                    {
                        username: id,
                        password: password,
                    }
                );

                const { token, username } = response.data;

                if (token) {
                    localStorage.setItem("userToken", token);
                    localStorage.setItem("userNickname", username);
                    navigate('/');
                } else {
                    console.log("로그인 실패: ", response.data.message);
                }
            } catch (error) {
                console.log("error: ", error.response.data);
            }
        }
    };

    return (
        <PageContainer>
            <LoginP>로그인 페이지</LoginP>

            <LoginContainer>
                <InputLogin 
                    placeholder="아이디" 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)}
                />
                <InputLogin 
                    placeholder="비밀번호" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <LoginButton onClick={handleLogin}>로그인</LoginButton>
            </LoginContainer>
        </PageContainer>
    );
};

export default LoginPage;

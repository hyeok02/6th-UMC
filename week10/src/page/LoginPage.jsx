import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/Style/PageStyle";
import InputLogin from "../components/Login/Login";

const LoginP = styled.p`
    font-size: 1vw;
    color: white;
    font-weight: bold;
    margin-top: 2.8vw;

    @media (max-width: 768px) {
        font-size: 3vw;
        margin-top: 5vw;
    }
`;

const LoginContainer = styled.div`
    margin-top: 2vw;
    width: 31.7vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;

    @media (max-width: 768px) {
        width: 80%;
        gap: 4vw;
    }

    @media (max-width: 480px) {
        width: 90%;
        gap: 6vw;
    }
`;

const LoginButton = styled.button`
    width: 100%;
    height: 3vw;
    border: none;
    border-radius: 2.5vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 2vw;
    font-size: 1.2vw;
    color: black;
    font-weight: bold;

    @media (max-width: 768px) {
        height: 8vw;
        font-size: 3vw;
        border-radius: 5vw;
    }

    @media (max-width: 480px) {
        height: 10vw;
        font-size: 4vw;
        border-radius: 6vw;
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

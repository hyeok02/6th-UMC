import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/Style/PageStyle";
import InputLogin from "../components/Login/Login";

const LoginP = styled.p`
    font-size: 1vw;
    color: white;
    font-weight: bold;
    margin-top: 2.8vw;
`

const LoginContainer = styled.div`
    margin-top: 2vw;
    width: 31.7vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
`

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
`

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            // 이미 로그인되어 있는 경우, 메인 페이지로 자동 이동
            window.location.href = "/";
        }
    }, []);

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
              window.location.href = "/";
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
    )
}

export default LoginPage;
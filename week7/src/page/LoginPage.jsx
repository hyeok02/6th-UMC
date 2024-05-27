import React, { useEffect } from 'react';
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
    useEffect(() => {
        const signupLogs = localStorage.getItem('signupLogs');
        if (signupLogs) {
            console.log(JSON.parse(signupLogs));
        }
    }, []);

    return (
        <PageContainer>
            <LoginP>로그인 페이지</LoginP>

            <LoginContainer>
                <InputLogin placeholder="아이디" type="text"/>
                <InputLogin placeholder="비밀번호" type="password"/>

                <LoginButton>로그인</LoginButton>
            </LoginContainer>
        </PageContainer>
    )
}

export default LoginPage;
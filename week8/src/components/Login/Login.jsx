import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const InputBox = styled.input`
    width: 100%;
    height: 57.6px; // 3vw를 1920px 너비 기준으로 변환
    background-color: white;
    border: none;
    padding: 0 19.2px; // 1vw를 1920px 너비 기준으로 변환
    box-sizing: border-box;
    outline: none;
    font-size: 15.36px; // 0.8vw를 1920px 너비 기준으로 변환

    @media (max-width: 768px) {
        height: 61.44px; // 8vw를 768px 너비 기준으로 변환
        font-size: 19.2px; // 2.5vw를 768px 너비 기준으로 변환
        border-radius: 30.72px; // 4vw를 768px 너비 기준으로 변환
    }

    @media (max-width: 480px) {
        height: 48px; // 10vw를 480px 너비 기준으로 변환
        font-size: 14.4px; // 3vw를 480px 너비 기준으로 변환
        border-radius: 24px; // 5vw를 480px 너비 기준으로 변환
    }
`

const InputLogin = ({placeholder, type, value, onChange}) => {
    return (
        <InputContainer>
            <InputBox 
                placeholder={placeholder} 
                type={type} 
                value={value} 
                onChange={onChange}
            />
        </InputContainer>
    )
}

export default InputLogin;

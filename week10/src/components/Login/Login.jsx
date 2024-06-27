import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const InputBox = styled.input`
    width: 100%;
    height: 3vw;
    background-color: white;
    border: none;
    padding: 0 1vw;
    box-sizing: border-box;
    outline: none;
    font-size: 0.8vw;

    @media (max-width: 768px) {
        height: 8vw;
        font-size: 2.5vw;
        border-radius: 4vw;
    }

    @media (max-width: 480px) {
        height: 10vw;
        font-size: 3vw;
        border-radius: 5vw;
    }
`;

const InputLogin = ({ placeholder, type, value, onChange }) => {
    return (
        <InputContainer>
            <InputBox 
                placeholder={placeholder} 
                type={type} 
                value={value} 
                onChange={onChange}
            />
        </InputContainer>
    );
};

export default InputLogin;

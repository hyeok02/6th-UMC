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
        height: 6vw;
        font-size: 2vw;
    }

    @media (max-width: 480px) {
        height: 8vw;
        font-size: 3vw;
    }
`;

const ErrorP = styled.p`
    font-size: 0.6vw;
    font-weight: bold;
    color: #FF0000;
    position: absolute;
    left: 0;
    bottom: -1.9vw; 
    padding-left: 0.5vw;

    @media (max-width: 768px) {
        font-size: 1.5vw;
        bottom: -3vw;
    }

    @media (max-width: 480px) {
        font-size: 2.5vw;
        bottom: -4vw;
    }
`;

const InputSignUp = ({ placeholder, type, value, onChange, error }) => {
    return (
        <InputContainer>
            <InputBox placeholder={placeholder} type={type} value={value} onChange={onChange} />
            {error && <ErrorP>{error}</ErrorP>}
        </InputContainer>
    );
};

export default InputSignUp;

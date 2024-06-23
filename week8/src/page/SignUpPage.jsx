import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/Style/PageStyle";
import InputSignUp from "../components/Sign/Sign";
import { useNavigate } from 'react-router-dom';

const SignUpP = styled.p`
    font-size: ${props => props.fontSize || "19.2px"}; // 1vw를 1920px 기준으로 변환
    color: white;
    font-weight: ${props => props.fontWeight || "normal"};

    @media (max-width: 768px) {
        font-size: ${props => props.fontSizeMobile || "57.6px"}; // 3vw를 768px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: ${props => props.fontSizeMobile || "76.8px"}; // 4vw를 480px 기준으로 변환
    }
`;

const SignUpContainer = styled.div`
    margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    width: 608.64px; // 31.7vw를 1920px 기준으로 변환
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 38.4px; // 2vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        width: 80%;
        gap: 76.8px; // 4vw를 768px 기준으로 변환
    }

    @media (max-width: 480px) {
        width: 90%;
        gap: 115.2px; // 6vw를 480px 기준으로 변환
    }
`;

const SignUpButton = styled.button`
    width: 100%;
    height: 57.6px; // 3vw를 1920px 기준으로 변환
    border: none;
    border-radius: 48px; // 2.5vw를 1920px 기준으로 변환
    background-color: ${props => props.disabled ? 'white' : '#FFCC15'};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    font-size: 23.04px; // 1.2vw를 1920px 기준으로 변환
    color: black;
    font-weight: bold;

    @media (max-width: 768px) {
        height: 61.44px; // 8vw를 768px 기준으로 변환
        font-size: 57.6px; // 3vw를 768px 기준으로 변환
        border-radius: 96px; // 5vw를 768px 기준으로 변환
    }

    @media (max-width: 480px) {
        height: 48px; // 10vw를 480px 기준으로 변환
        font-size: 57.6px; // 4vw를 480px 기준으로 변환
        border-radius: 72px; // 6vw를 480px 기준으로 변환
    }
`;

const BottomContainer = styled.div`
    width: 422.4px; // 22vw를 1920px 기준으로 변환
    margin-top: 5.76px; // 0.3vw를 1920px 기준으로 변환
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        width: 80%;
    }
`;

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const navigate = useNavigate(); 
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (name && username && email && age && password && (password === passwordCheck)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, username, email, age, password, passwordCheck]);

    const handleName = (event) => {
        const value = event.target.value;
        setName(value);
        if (!value) {
            setNameError("이름을 입력해주세요!");
        } else { 
            setNameError('');
        }
    }

    const handleUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
        if (!value) {
            setUsernameError("아이디를 입력해주세요!");
        } else { 
            setUsernameError('');
        }
    }

    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!value) {
            setEmailError("이메일을 입력해주세요!");
        } else if (!value.includes('@')) {
            setEmailError("이메일 형식에 맞게 다시 입력해주세요!");
        } else {
            setEmailError('');
        }
    }

    const handleAge = (event) => {
        const value = event.target.value;
        setAge(value);
        if (!value) {
            setAgeError("나이를 입력해주세요!");
        } else if (isNaN(value)) {
            setAgeError("나이는 숫자로 입력해주세요!");
        } else {
            if (parseInt(value) < 0) {
                setAgeError("나이는 양수여야 합니다.");
            } else if ((value) % 1 !== 0) {
                setAgeError("나이를 실수로 입력할 수 없습니다.");
            } else if (parseInt(value) < 19) {
                setAgeError("19세 이상만 사용 가능합니다!");
            } else {
                setAgeError('');
            }
        }
    }

    const handlePassword = (event) => {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])+/;
        const value = event.target.value;
        setPassword(value);
        if (!value) {
            setPasswordError("비밀번호를 입력해주세요!");
        } else if (value.length < 4) {
            setPasswordError("최소 4자리 이상 입력해주세요.");
        } else if (value.length > 12) {
            setPasswordError("최대 12자리까지 입력 가능합니다.");
        } else if (passwordPattern.test(value) === false) {
            setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해주세요.");
        } else {
            setPasswordError('');
        }
    }

    const handlePasswordCheck = (event) => {
        const value = event.target.value;
        setPasswordCheck(value);
        if (!value || value !== password) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordCheckError('');
        }
    }

    const handleSignUp = () => {
        const userData = {
            name: name,
            age: age,
            passwordCheck: passwordCheck,
            email: email,
            password: password,
            username: username
        };

        axios.post('http://localhost:8080/auth/signup', userData)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('signupLogs', JSON.stringify(response.data));
                alert("회원가입이 정상적으로 처리되었습니다.");
                navigate('/login');
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response.status === 409) {
                    navigate('/login');
                }
            });
    }

    return (
        <PageContainer>
            <SignUpP fontWeight="bold" style={{marginTop: "53.76px"}}>회원가입</SignUpP> {/* 2.8vw를 1920px 기준으로 변환 */}

            <SignUpContainer>
                <InputSignUp placeholder="이름을 입력하세요" type="text" value={name} onChange={handleName} error={nameError}/>
                <InputSignUp placeholder="아이디를 입력하세요" type="text" value={username} onChange={handleUsername} error={usernameError}/>
                <InputSignUp placeholder="이메일을 입력하세요" type="text" value={email} onChange={handleEmail} error={emailError}/>
                <InputSignUp placeholder="나이를 입력하세요" type="text" value={age} onChange={handleAge} error={ageError}/>
                <InputSignUp placeholder="비밀번호를 입력하세요" type="password" value={password} onChange={handlePassword} error={passwordError}/>
                <InputSignUp placeholder="비밀번호 확인" type="password" value={passwordCheck} onChange={handlePasswordCheck} error={passwordCheckError}/>

                <SignUpButton disabled={isDisabled} onClick={handleSignUp}>제출하기</SignUpButton>
            </SignUpContainer>
            
            <BottomContainer>
                <SignUpP fontSize="15.36px" fontSizeMobile="38.4px">이미 아이디가 있으신가요?</SignUpP> {/* 0.8vw를 1920px 기준으로 변환 */}
                <SignUpP fontWeight="bold" fontSize="15.36px" fontSizeMobile="38.4px" style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=>navigate('/login')}>로그인 페이지로 이동하기</SignUpP> {/* 0.8vw를 1920px 기준으로 변환 */}
            </BottomContainer>
        </PageContainer>
    )
}

export default SignUpPage;

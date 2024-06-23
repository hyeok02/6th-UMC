import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import PageContainer from "../components/Style/PageStyle";
import InputSignUp from "../components/Sign/Sign";
import { useNavigate } from 'react-router-dom';

const SignUpP = styled.p`
    font-size: ${props => props.fontSize || "1vw"};
    color: white;
    font-weight: ${props => props.fontWeight || "normal"};

    @media (max-width: 768px) {
        font-size: 2vw;
    }

    @media (max-width: 480px) {
        font-size: 3vw;
    }
`;

const SignUpContainer = styled.div`
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

const SignUpButton = styled.button`
    width: 100%;
    height: 3vw;
    border: none;
    border-radius: 2.5vw;
    background-color: ${props => props.disabled ? 'white' : '#FFCC15'};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
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

const BottomContainer = styled.div`
    width: 22vw;
    margin-top: 0.3vw;
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 60%;
        margin-top: 1vw;
    }

    @media (max-width: 480px) {
        width: 70%;
        margin-top: 2vw;
    }
`;

const SignUpPage = () => {
    // 입력 값
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    // 에러 메시지
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

    // 이름 검사
    const handleName = (event) => {
        const value = event.target.value;
        setName(value);

        if (!value) {
            setNameError("이름을 입력해주세요!");
        } else { 
            setNameError('');
        }
    }

    // 아이디 검사
    const handleUsername = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (!value) {
            setUsernameError("아이디를 입력해주세요!");
        } else { 
            setUsernameError('');
        }
    }

    // 이메일 검사
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

    // 나이 검사
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

    // 비밀번호 검사
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
        } else if (passwordPattern.test(value) == false) {
            setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해주세요.");
        } else {
            setPasswordError('');
        }
    }

    // 비밀번호 확인 검사
    const handlePasswordCheck = (event) => {
        const value = event.target.value;
        setPasswordCheck(value);

        if (!value || value !== password) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordCheckError('');
        }
    }

    // 가입하기 통신
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
            <SignUpP fontWeight="bold" style={{marginTop: "2.8vw"}}>회원가입</SignUpP>

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
                <SignUpP fontSize="0.8vw">이미 아이디가 있으신가요?</SignUpP>
                <SignUpP fontWeight="bold" fontSize="0.8vw" style={{cursor: "pointer", textDecoration: "underline"}} onClick={()=>navigate('/login')}>로그인 페이지로 이동하기</SignUpP>
            </BottomContainer>
        </PageContainer>
    )
}

export default SignUpPage;

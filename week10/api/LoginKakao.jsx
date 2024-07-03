import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { getRedirectURI } from "./RedirectURI";
import axios from "axios";
import Kakaologin from "../src/assets/images/KakaoTalk_login.png";

const KakaoLoginButton = styled.img`
    width: 100%;
    cursor: pointer;
`;

const LoginKakao = () => {
    const kakaoRestAPIKey = import.meta.env.VITE_REST_API_ACCESS;
    const redirectURI = getRedirectURI();
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestAPIKey}&redirect_uri=${redirectURI}&response_type=code`;

    const [authCode, setAuthCode] = useState(null);

    const redirectToKakaoLogin = () => {
        window.location.href = kakaoAuthURL;
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
            setAuthCode(code);
        }
    }, []);

    useEffect(() => {
        if (authCode) {
            requestAccessToken(authCode);
        }
    }, [authCode]);

    const requestAccessToken = async (code) => {
        const createFormData = (params) => {
            const formData = new URLSearchParams();
            for (const key in params) {
                formData.append(key, params[key]);
            }
            return formData;
        };

        try {
            const response = await axios.post('https://kauth.kakao.com/oauth/token', createFormData({
                grant_type: 'authorization_code',
                client_id: kakaoRestAPIKey,
                redirect_uri: redirectURI,
                code
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            const { access_token: accessToken } = response.data;
            if (accessToken) {
                localStorage.setItem('token', accessToken);
                fetchUserInfo(accessToken);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUserInfo = async (accessToken) => {
        try {
            const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const { nickname: username } = response.data.kakao_account.profile;
            localStorage.setItem('username', username);

            window.location.href = "/";
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <KakaoLoginButton src={Kakaologin} alt="Kakao login button" onClick={redirectToKakaoLogin} />
    );
};

export default LoginKakao;

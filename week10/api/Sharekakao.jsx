import React, { useEffect } from 'react';
import styled from 'styled-components';
import KakaoImage from '../src/assets/images/Kakao_logo.jpg';

const KakaoImg = styled.img`
    width: 1.5vw;
    cursor: pointer;
`;

const ShareKakao = () => {
    useEffect(() => {
        if (!window.Kakao) {
        console.error('Kakao SDK is not loaded');
        return;
        }

        const kakao = window.Kakao;
        const kakaoToken = import.meta.env.VITE_KAKAO_API;
        console.log(kakaoToken);

        if (!kakao.isInitialized()) {
        kakao.init(kakaoToken);
        }
    }, []);

    const handleShareKakao = () => {
        if (!window.Kakao || !window.Kakao.Link) {
        console.error('Kakao SDK or Link module is not available');
        return;
        }

        window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '영화 검색 사이트', // 카카오톡 제목
            description: '#UMC #6기 #한성대 #Web #10주차',  // 카카오톡 상세 설명
            imageUrl:'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',    // 카카오톡 이미지
            link: {
            mobileWebUrl: 'https://week10-umc.netlify.app/', // 배포 링크
            webUrl: 'https://week10-umc.netlify.app/',   // 배포 링크
            },
        },
        buttons: [
            {
            title: '영화 찾아보러 가기',    // 카카오톡 버튼
            link: {
                mobileWebUrl: 'https://week10-umc.netlify.app/', // 배포 링크
                webUrl: 'https://week10-umc.netlify.app/',   // 배포 링크
            },
            },
        ],
        });
    };

    return <KakaoImg src={KakaoImage} alt="kakao" onClick={handleShareKakao} />;
};

export default ShareKakao;

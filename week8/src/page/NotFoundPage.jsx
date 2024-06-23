import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundDiv = styled.div`
    background: #232649;  
    width: 100%;
    min-height: calc(100vh - 5vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
`;

const Titlep = styled.p`
    font-size: 48px; // 2.5vw를 1920px 기준으로 변환
`;

const ErrorMessagep = styled.p`
    font-size: 19.2px; // 1vw를 1920px 기준으로 변환
`;

const NotFoundp = styled.p`
    font-size: 19.2px; // 1vw를 1920px 기준으로 변환
    font-style: italic;
`;

const Link = styled(RouterLink)`
    font-size: 28.8px; // 1.5vw를 1920px 기준으로 변환
`;

const NotFoundPage = () => {
    return (
        <NotFoundDiv>
            <Titlep>Oops!</Titlep>
            <ErrorMessagep>에러가 발생했습니다</ErrorMessagep>
            <NotFoundp>Not Found</NotFoundp>
            <Link to="/">메인으로 이동하기</Link>
        </NotFoundDiv>
    );
}

export default NotFoundPage;

import styled from "styled-components";

const PageContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 115.2px); // 6vw를 1920px 기준으로 변환
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.background ? `url(${props.background})` : 'none'};
    background-size: cover;
    background-position: center;
    padding-bottom: 38.4px; // 2vw를 1920px 기준으로 변환
    
    @media (max-width: 768px) {
        padding: 38.4px; // 2vw를 1920px 기준으로 변환
    }
`;

export default PageContainer;

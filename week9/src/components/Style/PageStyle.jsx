import styled from "styled-components";

const PageContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 6vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => props.background ? `url(${props.background})` : 'none'};
    background-size: cover;
    background-position: center;
    padding-bottom: 2vw; // 하단에 2vw 여백 추가
`;

export default PageContainer;

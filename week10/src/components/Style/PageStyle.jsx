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
    padding-bottom: 2vw;

    @media (max-width: 1200px) {
        min-height: calc(100vh - 10vw);
        padding-bottom: 3vw;
    }

    @media (max-width: 768px) {
        min-height: calc(100vh - 12vw);
        padding-bottom: 4vw;
    }

    @media (max-width: 480px) {
        min-height: calc(100vh - 15vw);
        padding-bottom: 5vw;
    }
`;

export default PageContainer;

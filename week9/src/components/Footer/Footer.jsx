import styled from "styled-components";

const FooterContainer = styled.div`
    width: 100%;
    height: 2vw;
    background-color: #FFCC15;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0; 
    left: 0; 
    right: 0; 
    z-index: 999;

    @media (max-width: 768px) {
        height: 5vw;
    }

    @media (max-width: 480px) {
        height: 8vw;
    }
`;

const FooterP = styled.p`
    font-style: italic;
    font-weight: bold;
    font-size: 1vw;

    @media (max-width: 768px) {
        font-size: 2.5vw;
    }

    @media (max-width: 480px) {
        font-size: 3.5vw;
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterP>UMC 6th Web_Hansung Univ</FooterP>
        </FooterContainer>
    )
}

export default Footer;

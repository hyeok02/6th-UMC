import styled from "styled-components";

const FooterContainer = styled.div`
    width: 100%;
    height: 38.4px; // 2vw를 1920px 너비 기준으로 변환
    background-color: #FFCC15;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0; 
    left: 0; 
    right: 0; 
    z-index: 999; 
`

const FooterP = styled.p`
    font-style: italic;
    font-weight: bold;
    font-size: 19.2px; // 1vw를 1920px 너비 기준으로 변환
`

const Footer = () => {
    return (
        <FooterContainer>
            <FooterP>UMC 6th Web_Hansung Univ</FooterP>
        </FooterContainer>
    )
}

export default Footer;

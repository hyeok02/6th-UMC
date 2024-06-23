import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const NavContainer = styled.div`
    width: 100%;
    height: 76.8px; /* 4vw를 1920px 기준으로 변환 */
    background-color: #040E40;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 가운데 정렬에서 space-between으로 변경 */
    padding: 0 20px;
    @media (max-width: 760px) {
        height: auto;
        padding: 10px 20px;
    }
`;

const NavP = styled(NavLink)`
    font-size: 19.2px; /* 1vw를 1920px 기준으로 변환 */
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        color: #FFCC15;
        font-size: 21.12px; /* 1.1vw를 1920px 기준으로 변환 */
    }

    @media (max-width: 760px) {
        font-size: 24px; /* 적절한 폰트 크기로 변경 */
    }
`;

const NavPContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    @media (max-width: 760px) {
        display: none;
    }
`;

const HamburgerMenu = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;
    @media (max-width: 760px) {
        display: flex;
    }
`;

const Bar = styled.div`
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
`;

const Sidebar = styled.div`
    height: 100%;
    width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #040E40;
    overflow-x: hidden;
    transition: width 0.3s; /* width의 변화에 애니메이션 적용 */
    padding-top: 60px;
    @media (min-width: 761px) {
        display: none;
    }
`;

const SidebarLink = styled(NavLink)`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: white;
    display: block;
    transition: 0.3s;

    &:hover {
        color: #FFCC15;
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    cursor: pointer;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('userToken');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userNickname");
        navigate('/');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <NavContainer>
                <NavP to="/">UMC Movie</NavP>
                <NavPContainer>
                    {isLoggedIn ? (
                        <NavP onClick={handleLogout}>로그아웃</NavP>
                    ) : (
                        <>
                            <NavP to="/login">로그인</NavP>
                            <NavP to="/sign">회원가입</NavP>
                        </>
                    )}
                    <NavP to="/popular">Popular</NavP>
                    <NavP to="/now">Now Playing</NavP>
                    <NavP to="/top">Top Rated</NavP>
                    <NavP to="/up">Upcoming</NavP>
                </NavPContainer>
                <HamburgerMenu onClick={toggleSidebar}>
                    <Bar />
                    <Bar />
                    <Bar />
                </HamburgerMenu>
            </NavContainer>
            <Sidebar isOpen={isSidebarOpen}>
                <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
                <SidebarLink to="/" onClick={toggleSidebar}>UMC Movie</SidebarLink>
                {isLoggedIn ? (
                    <SidebarLink to="/" onClick={handleLogout}>로그아웃</SidebarLink>
                ) : (
                    <>
                        <SidebarLink to="/login" onClick={toggleSidebar}>로그인</SidebarLink>
                        <SidebarLink to="/sign" onClick={toggleSidebar}>회원가입</SidebarLink>
                    </>
                )}
                <SidebarLink to="/popular" onClick={toggleSidebar}>Popular</SidebarLink>
                <SidebarLink to="/now" onClick={toggleSidebar}>Now Playing</SidebarLink>
                <SidebarLink to="/top" onClick={toggleSidebar}>Top Rated</SidebarLink>
                <SidebarLink to="/up" onClick={toggleSidebar}>Upcoming</SidebarLink>
            </Sidebar>
        </>
    );
}

export default Navbar;

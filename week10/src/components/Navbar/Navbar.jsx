import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ShareKakao from "../../../api/Sharekakao";

const NavContainer = styled.div`
    width: 100%;
    height: 4vw;
    background-color: #040E40;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media (max-width: 768px) {
        height: 10vw;
    }
`;

const NavContainer2 = styled.div`
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavPContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 760px) {
        display: none;
    }
`;

const NavP = styled(NavLink)`
    font-size: 1vw;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        color: #FFCC15;
        font-size: 1.1vw;
    }

    @media (max-width: 768px) {
        font-size: 3vw;

        &:hover {
            font-size: 3.5vw;
        }
    }
`;

const NavP2 = styled(NavP)`
    &.active {
        color: #FFCC15;
    }
`;

const HamburgerIcon = styled(FaBars)`
    display: none;
    color: white;
    font-size: 2vw;
    cursor: pointer;

    @media (max-width: 760px) {
        display: block;
    }

    @media (max-width: 480px) {
        font-size: 5vw;
    }
`;

const Sidebar = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background-color: #040E40;
    display: flex;
    flex-direction: column;
    padding: 20px;
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
    z-index: 2;

    @media (max-width: 480px) {
        width: 70%;
    }
`;

const CloseIcon = styled(FaTimes)`
    font-size: 2vw;
    color: white;
    align-self: flex-end;
    cursor: pointer;

    @media (max-width: 480px) {
        font-size: 5vw;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    z-index: 1;
`;

const SidebarLink = styled(NavP2)`
    font-size: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
        font-size: 2rem;
    }
`;

const Navbar = () => {
    const location = useLocation();
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

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            <NavContainer>
                <NavContainer2>
                    <NavP to="/">UMC Movie</NavP>
                    <ShareKakao/>
                    <NavPContainer>
                        {isLoggedIn ? (
                            <NavP onClick={handleLogout}>로그아웃</NavP>
                        ) : (
                            <>
                                <NavP2 to="/login">로그인</NavP2>
                                <NavP2 to="/sign">회원가입</NavP2>
                            </>
                        )}
                        <NavP2 to="/popular">Popular</NavP2>
                        <NavP2 to="/now">Now Playing</NavP2>
                        <NavP2 to="/top">Top Rated</NavP2>
                        <NavP2 to="/up">Upcoming</NavP2>
                    </NavPContainer>
                    <HamburgerIcon onClick={toggleSidebar} />
                </NavContainer2>
            </NavContainer>
            <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
            <Sidebar isOpen={isSidebarOpen}>
                <CloseIcon onClick={closeSidebar} />
                {isLoggedIn ? (
                    <SidebarLink onClick={() => { handleLogout(); closeSidebar(); }}>로그아웃</SidebarLink>
                ) : (
                    <>
                        <SidebarLink to="/login" onClick={closeSidebar}>로그인</SidebarLink>
                        <SidebarLink to="/sign" onClick={closeSidebar}>회원가입</SidebarLink>
                    </>
                )}
                <SidebarLink to="/popular" onClick={closeSidebar}>Popular</SidebarLink>
                <SidebarLink to="/now" onClick={closeSidebar}>Now Playing</SidebarLink>
                <SidebarLink to="/top" onClick={closeSidebar}>Top Rated</SidebarLink>
                <SidebarLink to="/up" onClick={closeSidebar}>Upcoming</SidebarLink>
            </Sidebar>
        </>
    );
};

export default Navbar;

import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavContainer = styled.div`
    width: 100%;
    height: 4vw;
    background-color: #040E40;
    display: flex;
    align-items: center;
    justify-content: center;
`

const NavContainer2 = styled.div`
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavPContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavP = styled(NavLink)`
    font-size: 1vw;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        color: #FFCC15;
        font-size: 1.1vw;
    }
`

const NavP2 = styled(NavP)`
    &.active {
        color: #FFCC15;
    }
`

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('userToken');

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userNickname");
        navigate('/');
    };

    return (
        <NavContainer>
            <NavContainer2>
                <NavP to="/">UMC Movie</NavP>
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
            </NavContainer2>
        </NavContainer>
    )
}

export default Navbar;

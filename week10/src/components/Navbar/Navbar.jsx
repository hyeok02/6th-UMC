import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import ShareKakao from "../../../api/Sharekakao";
import { getRedirectURI } from "../../../api/RedirectURI";

const NavbarWrapper = styled.div`
    width: 100%;
    height: 4vw;
    background-color: #040E40;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavbarContent = styled.div`
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LinkGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
`;

const StyledNavLink = styled(NavLink)`
    font-size: 1vw;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        color: #FFCC15;
        font-size: 1.1vw;
    }

    &.active {
        color: #FFCC15;
    }
`;

const LogoGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5vw;
`;

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, [location]);

    const logoutHandler = async () => {
        const clientId = import.meta.env.VITE_REST_API_ACCESS;
        const logoutRedirectURI = getRedirectURI();
        const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${logoutRedirectURI}`;

        try { 
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setIsAuthenticated(false);
            window.location.href = kakaoLogoutURL;
        } catch (error) {
            console.error('Logout Error: ', error);
        }
    };

    const displayNav = [
        '/',
        '/sign',
        '/login',
        '/popular',
        '/now',
        '/top',
        '/up'
    ].includes(location.pathname) || location.pathname.startsWith("/movie/") || location.pathname.startsWith("/login/auth");

    if (!displayNav) {
        return null;
    }

    return (
        <NavbarWrapper>
            <NavbarContent>
                <LogoGroup>
                    <StyledNavLink to="/">UMC Movie</StyledNavLink>
                    <ShareKakao/>
                </LogoGroup>
                <LinkGroup>
                    {isAuthenticated ? (
                        <StyledNavLink to="/" onClick={logoutHandler}>로그아웃</StyledNavLink>
                    ) : (
                        <>
                            <StyledNavLink to="/login">로그인</StyledNavLink>
                            <StyledNavLink to="/sign">회원가입</StyledNavLink>
                        </>
                    )}
                    <StyledNavLink to="/popular">Popular</StyledNavLink>
                    <StyledNavLink to="/now">Now Playing</StyledNavLink>
                    <StyledNavLink to="/top">Top Rated</StyledNavLink>
                    <StyledNavLink to="/up">Upcoming</StyledNavLink>
                </LinkGroup>
            </NavbarContent>
        </NavbarWrapper>
    );
}

export default Navbar;

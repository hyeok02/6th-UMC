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

    @media (max-width: 800px) {
        height: 50px;
    }
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

    @media (max-width: 800px) {
        display: none;
    }
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

    @media (max-width: 800px) {
        font-size: 3vw;
    }
`;

const LogoGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5vw;
`;

const HamburgerMenu = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    @media (max-width: 800px) {
        display: flex;
    }
`;

const HamburgerLines = styled.div`
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 3px 0;
`;

const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #040E40;
    position: absolute;
    top: 50px;
    right: 0;
    width: 100%;
    padding: 1em;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);

    @media (min-width: 801px) {
        display: none;
    }
`;

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <HamburgerMenu onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <HamburgerLines />
                    <HamburgerLines />
                    <HamburgerLines />
                </HamburgerMenu>
            </NavbarContent>
            {isMobileMenuOpen && (
                <MobileMenu>
                    {isAuthenticated ? (
                        <StyledNavLink to="/" onClick={() => { setIsMobileMenuOpen(false); logoutHandler(); }}>로그아웃</StyledNavLink>
                    ) : (
                        <>
                            <StyledNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>로그인</StyledNavLink>
                            <StyledNavLink to="/sign" onClick={() => setIsMobileMenuOpen(false)}>회원가입</StyledNavLink>
                        </>
                    )}
                    <StyledNavLink to="/popular" onClick={() => setIsMobileMenuOpen(false)}>Popular</StyledNavLink>
                    <StyledNavLink to="/now" onClick={() => setIsMobileMenuOpen(false)}>Now Playing</StyledNavLink>
                    <StyledNavLink to="/top" onClick={() => setIsMobileMenuOpen(false)}>Top Rated</StyledNavLink>
                    <StyledNavLink to="/up" onClick={() => setIsMobileMenuOpen(false)}>Upcoming</StyledNavLink>
                </MobileMenu>
            )}
        </NavbarWrapper>
    );
}

export default Navbar;

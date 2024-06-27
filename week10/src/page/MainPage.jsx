import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PageContainer from "../components/Style/PageStyle";
import Banner from "../components/Banner/Banner";
import ListResult from "../components/Movie/ListResult";
import searchIcon from "../assets/images/searchIcon.png";

const SearchBox = styled.div`
    width: 25.75vw;
    min-height: 7.55vw;
    margin-top: 3.5vw;
    text-align: center;

    @media (max-width: 768px) {
        width: 80%;
        margin-top: 5vw;
    }

    @media (max-width: 480px) {
        width: 90%;
        margin-top: 7vw;
    }
`;

const MainP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.8vw;

    @media (max-width: 768px) {
        font-size: 3vw;
    }

    @media (max-width: 480px) {
        font-size: 4vw;
    }
`;

const SearchBox2 = styled.div`
    width: 100%;
    margin-top: 3.2vw;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        margin-top: 5vw;
    }

    @media (max-width: 480px) {
        margin-top: 7vw;
    }
`;

const SearchInput = styled.input`
    width: 20vw;
    height: 2.5vw;
    background-color: white;
    border: none;
    border-radius: 2.5vw;
    padding: 0 1vw;
    font-size: 1vw;
    color: black;

    @media (max-width: 768px) {
        width: 70%;
        height: 6vw;
        font-size: 3vw;
    }

    @media (max-width: 480px) {
        width: 80%;
        height: 8vw;
        font-size: 4vw;
    }
`;

const SearchImg = styled.img`
    width: 2.5vw;
    height: 2.5vw;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 8vw;
        height: 8vw;
    }

    @media (max-width: 480px) {
        width: 10vw;
        height: 10vw;
    }
`;

const MainPage = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    const handleSearch = () => {
        setIsLoading(true);

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                include_adult: 'false',
                page: '1',
                query: search
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };

        axios.request(options)
            .then(response => {
                setSearchResults(response.data.results);
                console.log(response.data.results);
            })
            .catch(err => console.error(err))
            .finally(() => { setIsLoading(false) });
    };

    React.useEffect(() => {
        if (search) {
            handleSearch();
        }
    }, [search]);

    return (
        <PageContainer>
            <Banner/>
            <SearchBox>
                <MainP>Find your movies!</MainP>
                <SearchBox2>
                    <SearchInput 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Search.."
                    />
                    <SearchImg src={searchIcon} alt="search" onClick={handleSearch}/>
                </SearchBox2>
            </SearchBox>

            {isLoading ? <MainP style={{fontSize: "1vw", marginTop: "2vw"}}>데이터를 받아오는 중 입니다.</MainP> : <ListResult searchResults={searchResults}/>}
        </PageContainer>
    )
}

export default MainPage;

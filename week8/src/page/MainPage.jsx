import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PageContainer from "../components/Style/PageStyle";
import Banner from "../components/Banner/Banner";
import ListResult from "../components/Movie/ListResult";
import SearchIcon from "../assets/images/searchIcon.png";

const SearchBox = styled.div`
    width: 494.4px; // 25.75vw를 1920px 기준으로 변환
    min-height: 145.92px; // 7.55vw를 1920px 기준으로 변환
    margin-top: 67.2px; // 3.5vw를 1920px 기준으로 변환
    text-align: center;

    @media (max-width: 768px) {
        width: 80%;
        min-height: auto;
        margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    }
`;

const MainP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 34.56px; // 1.8vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        font-size: 57.6px; // 4vw를 1920px 기준으로 변환
    }
`;

const SearchBox2 = styled.div`
    width: 100%;
    margin-top: 61.44px; // 3.2vw를 1920px 기준으로 변환
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        margin-top: 38.4px; // 2vw를 1920px 기준으로 변환
    }
`;

const SearchInput = styled.input`
    width: 384px; // 20vw를 1920px 기준으로 변환
    height: 48px; // 2.5vw를 1920px 기준으로 변환
    background-color: white;
    border: none;
    border-radius: 48px; // 2.5vw를 1920px 기준으로 변환
    padding: 0 19.2px; // 1vw를 1920px 기준으로 변환
    font-size: 19.2px; // 1vw를 1920px 기준으로 변환
    color: black;

    @media (max-width: 768px) {
        width: 100%;
        height: 48px; // 5vw를 768px 기준으로 변환
        font-size: 57.6px; // 3vw를 768px 기준으로 변환
        margin-bottom: 19.2px; // 1vw를 1920px 기준으로 변환
    }
`;

const SearchImg = styled.img`
    width: 48px; // 2.5vw를 1920px 기준으로 변환
    height: 48px; // 2.5vw를 1920px 기준으로 변환
    cursor: pointer;

    @media (max-width: 768px) {
        width: 76.8px; // 10vw를 768px 기준으로 변환
        height: 76.8px; // 10vw를 768px 기준으로 변환
    }
`;

const MainPage = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    const debounceSearch = useDebounce(search, 500);

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
        handleSearch();
    }, [debounceSearch]);

    return (
        <PageContainer>
            <Banner/>
            <SearchBox>
                <MainP>Find your movies!</MainP>
                <SearchBox2>
                    <SearchInput type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search.."/>
                    <SearchImg src={SearchIcon} alt="search" onClick={handleSearch}/>
                </SearchBox2>
            </SearchBox>

            {isLoading ? <MainP style={{fontSize: "19.2px", marginTop: "38.4px"}}>데이터를 받아오는 중 입니다.</MainP> : <ListResult searchResults={searchResults}/>}
        </PageContainer>
    );
}

export default MainPage;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PageContainer from "../components/Style/PageStyle";
import Banner from "../components/Banner/Banner";
import ListResult from "../components/Movie/ListResult";

const SearchBox = styled.div`
    width: 25.75vw;
    min-height: 7.55vw;
    margin-top: 3.5vw;
    text-align: center;
`

const MainP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.8vw;
`

const SearchBox2 = styled.div`
    width: 100%;
    margin-top: 3.2vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SearchInput = styled.input`
    width: 20vw;
    height: 2.5vw;
    background-color: white;
    border: none;
    border-radius: 2.5vw;
    padding: 0 1vw;
    font-size: 1vw;
    color: black;
`

const SearchImg = styled.img`
    width: 2.5vw;
    height: 2.5vw;
    cursor: pointer;
`

const MainPage = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    const handleSearch = () => {
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
            .catch(err => console.error(err));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <PageContainer>
            <Banner/>
            <SearchBox>
                <MainP>Find your movies!</MainP>
                <SearchBox2>
                    <SearchInput type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search.."/>
                    <button>search</button>
                </SearchBox2>
            </SearchBox>

            <ListResult searchResults={searchResults}/>
        </PageContainer>
    )
}

export default MainPage;
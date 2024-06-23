import React from "react";
import styled from "styled-components";
import ItemResult from "./item-result";

const ResultContainer = styled.div`
    width: 75%;
    max-height: 100vh;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin: 3vw auto;
    justify-content: center;
    background-color: #0A0E40;

    &::-webkit-scrollbar {
        width: 0.4vw;
        height: 0;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #FFCC15;
        border-radius: 0.5vw;
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        width: 90%;
        grid-template-columns: repeat(2, 1fr);
        margin: 2vw auto;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ListResult = ({ searchResults }) => {
    return (
        <ResultContainer>
            {searchResults.map((item) => (
                <ItemResult 
                    key={item.id} 
                    id={item.id}
                    poster={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    title={item.title}
                    rating={item.vote_average.toFixed(1)}
                    overview={item.overview}
                />
            ))}
        </ResultContainer>
    );
};

export default ListResult;

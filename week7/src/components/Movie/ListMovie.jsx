import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import styled from "styled-components";
import ItemMovie from "./item-movie";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Pagination";
import InfiniteScrollComponent from "../InfiniteScroll";

const Container = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column; 
    align-items: center; 
`;

const GridContainer = styled.div`
    width : 90%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-content: center;
`;

const SpinnerContainer = styled.div`
    min-height: calc(100vh - 6vw);
    display: flex;
    align-items: center; 
`;

const ListMovie = ({ Url, mode }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const accessToken = import.meta.env.VITE_API_ACCESS;

    const fetchMovies = useCallback(async (page) => {
        try {
            const options = {
                method: 'GET',
                url: Url,
                params: { language: 'ko', page },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            };

            setLoading(true);

            const response = await axios.request(options);
            setMovies(prev => mode === 'infinite' ? [...prev, ...response.data.results] : response.data.results);
            setPageCount(response.data.total_pages);
            setHasMore(page < response.data.total_pages);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [Url, mode, accessToken]);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [Url, currentPage, fetchMovies]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const loadMoreMovies = () => {
        setCurrentPage(prev => prev + 1);
    };

    return (
        <Container>
            {loading ? (
                <SpinnerContainer>
                    <Spinner loading={loading} />
                </SpinnerContainer> 
            ) : (
                <>
                    <GridContainer>
                        {movies.map((item) => (
                            <ItemMovie
                                key={item.id}
                                id={item.id}
                                poster={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                title={item.title}
                                rating={item.vote_average.toFixed(1)}
                                overview={item.overview}
                            />
                        ))}
                    </GridContainer>
                    {mode === 'pagination' ? (
                        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} currentPage={currentPage} />
                    ) : (
                        <InfiniteScrollComponent
                            dataLength={movies.length}
                            next={loadMoreMovies}
                            hasMore={hasMore}
                        >
                            {movies.map((item) => (
                                <ItemMovie
                                    key={item.id}
                                    id={item.id}
                                    poster={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    title={item.title}
                                    rating={item.vote_average.toFixed(1)}
                                    overview={item.overview}
                                />
                            ))}
                        </InfiniteScrollComponent>
                    )}
                </>
            )}
        </Container>
    );
};

export default ListMovie;

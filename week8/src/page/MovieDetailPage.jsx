import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoIosStar } from 'react-icons/io';
import PageContainer from "../components/Style/PageStyle";

const DetailBox = styled.div`
    width: 60%;
    min-height: calc(100vh - 96px); // 5vw를 1920px 기준으로 변환
    display: flex;
    margin: 0 384px; // 20vw를 1920px 기준으로 변환
    flex-direction: row;

    @media (max-width: 1024px) {
        flex-direction: column;
        width: 80%;
        margin: 0 192px; // 10vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        width: 90%;
        margin: 0 96px; // 5vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        width: 100%;
        margin: 0;
    }
`;

const Posterimg = styled.img`
    width: 30%;
    height: auto;
    margin: 96px; // 5vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        width: 50%;
        margin: 38.4px auto; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        width: 70%;
        margin: 38.4px auto; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        width: 90%;
        margin: 38.4px auto; // 2vw를 1920px 기준으로 변환
    }
`;

const DetailTextdiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 96px 0; // 5vw를 1920px 기준으로 변환
    margin-right: 96px; // 5vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        margin: 38.4px 0; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        margin: 38.4px; // 2vw를 1920px 기준으로 변환
    }
`;

const TitleP = styled.p`
    color: white;
    font-weight: bold;
    font-size: 38.4px; // 2vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 76.8px; // 4vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 96px; // 5vw를 1920px 기준으로 변환
    }
`;

const RateDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: white;
    font-size: 23.04px; // 1.2vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 38.4px; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 76.8px; // 4vw를 1920px 기준으로 변환
    }
`;

const ReleaseDateP = styled.p`
    color: white;
    font-size: 23.04px; // 1.2vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 38.4px; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 76.8px; // 4vw를 1920px 기준으로 변환
    }
`;

const SummaryTitle = styled.p`
    color: white;
    font-weight: bold;
    font-size: 23.04px; // 1.2vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 38.4px; // 2vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 76.8px; // 4vw를 1920px 기준으로 변환
    }
`;

const SummaryP = styled.p`
    color: white;
    font-size: 19.2px; // 1vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 34.56px; // 1.8vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 48px; // 2.5vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }
`;

const BackgroundDiv = styled.div`
    width: 100%;
    min-height: calc(100vh - 96px); // 5vw를 1920px 기준으로 변환
    background: rgba(0, 0, 0, 0.7);
`;

const CreditsTitle = styled.h2`
    color: white;
    text-align: center;
    margin-bottom: 38.4px; // 2vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        font-size: 48px; // 2.5vw를 1920px 기준으로 변환
    }

    @media (max-width: 768px) {
        font-size: 57.6px; // 3vw를 1920px 기준으로 변환
    }

    @media (max-width: 480px) {
        font-size: 76.8px; // 4vw를 1920px 기준으로 변환
    }
`;

const CreditsContainer = styled.div`
    color: white;
    display: grid;  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));  
    gap: 19.2px; // 1vw를 1920px 기준으로 변환
    justify-items: center;  
    justify-content: center;
    text-align: center;
`;

const CreditItem = styled.div`
    display: flex;
    flex-direction: column;  
    align-items: center;
    text-align: center; 
`;

const CreditImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 9.6px; // 0.5vw를 1920px 기준으로 변환

    @media (max-width: 1024px) {
        width: 70px;
        height: 70px;
    }

    @media (max-width: 768px) {
        width: 90px;
        height: 90px;
    }

    @media (max-width: 480px) {
        width: 110px;
        height: 110px;
    }
`;

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = import.meta.env.VITE_API_ACCESS;
    const NO_IMAGE_SRC = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        language: 'ko-KR'  
                    }
                });
                setMovie(movieResponse.data);
                
                const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCredits(creditsResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching the movie details:", error);
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, accessToken]);

    const renderStars = (rating) => {
        const stars = [];
        const starsCount = Math.floor(rating); 

        for (let i = 0; i < starsCount; i++) {
            stars.push(<IoIosStar key={i} color="yellow" />);
        }

        return stars;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie details not found.</div>;
    }

    return (
        <PageContainer style={{ 
                justifyContent: "center", 
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, 
                backgroundSize: 'cover' }}
        >
            <BackgroundDiv>
                <DetailBox>
                    <Posterimg src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />
                    <DetailTextdiv>
                        <TitleP>{movie.title}</TitleP>
                        <RateDiv>평점 {renderStars(movie.vote_average)}</RateDiv>
                        <ReleaseDateP>개봉일 {movie.release_date}</ReleaseDateP>
                        <SummaryTitle>줄거리</SummaryTitle>
                        <SummaryP>{movie.overview ? movie.overview : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}</SummaryP>
                    </DetailTextdiv>
                </DetailBox>
                {credits && (
                    <>
                        <CreditsTitle>출연진 및 제작진</CreditsTitle>
                        <CreditsContainer>
                            {credits.cast.slice(0, 5).map((member) => (
                                <CreditItem key={member.id}>
                                    <CreditImage src={member.profile_path ? `https://image.tmdb.org/t/p/w500/${member.profile_path}` : NO_IMAGE_SRC} alt={member.name} />
                                    <p>{member.name}<br/>as {member.character}</p>
                                </CreditItem>
                            ))}
                            {credits.crew.filter(member => member.job === 'Director').map((member) => (
                                <CreditItem key={member.id}>
                                    <CreditImage src={member.profile_path ? `https://image.tmdb.org/t/p/w500/${member.profile_path}` : NO_IMAGE_SRC} alt={member.name} />
                                    <p>{member.name}<br/>(Director)</p>
                                </CreditItem>
                            ))}
                        </CreditsContainer>
                    </>
                )}
            </BackgroundDiv>
        </PageContainer>
    );
};

export default MovieDetailPage;

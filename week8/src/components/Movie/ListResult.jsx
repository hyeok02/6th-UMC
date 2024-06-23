import styled from "styled-components";
import ItemResult from "./item-result";

const ResultContainer = styled.div`
    width: 65%;
    max-height: 768px; // 40vw를 1920px 기준으로 변환
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 57.6px auto; // 3vw를 1920px 기준으로 변환
    justify-content: center;
    background-color: #0A0E40;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }

    &::-webkit-scrollbar {
        width: 7.68px; // 0.4vw를 1920px 기준으로 변환
        height: 192px; // 10vw를 1920px 기준으로 변환
    }

    &::-webkit-scrollbar-thumb {
        background-color: #FFCC15;
        border-radius: 9.6px; // 0.5vw를 1920px 기준으로 변환
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
                    title={item.original_title}
                    original_title={item.original_title}
                    release_date={item.release_date}
                    rating={item.vote_average.toFixed(1)}
                    overview={item.overview}
                />
            ))}
        </ResultContainer>
    );
};

export default ListResult;

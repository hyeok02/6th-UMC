import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const MovieBox = styled.div`
    width: 100%;
    padding: 0.5rem;
    margin: 1rem;
    position: relative;
    cursor: pointer;

    @media (max-width: 1200px) {
        width: 80%;
        margin-right: 10%;
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        width: 70%;
        margin-right: 15%;
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        width: 60%;
        margin-right: 20%;
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Poster = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
`;

const MovieBoxBottom = styled.div`
    width: 95%;
    padding-top: 0.5rem;
    background-color: #383B67;
    display: flex;
    justify-content: center;
    padding: 1rem;

    @media (max-width: 1200px) {
        width: 80%;
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        width: 85%;
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        width: 90%;
        grid-template-columns: repeat(1, 1fr);
    }
`;

const SubTitle = styled.p`
    font-size: 0.8rem;
    color: #FFFFFF;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const OverExplain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.8;
    color: white;
    font-size: 0.8rem;
    padding: 1rem;
    display: none;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const OverTitle = styled.p`
    padding: 0.5rem;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const OverView = styled.p`
    padding: 0.5rem;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const ItemResult = ({ id, poster, original_title, title, rating, overview, release_date }) => {
    const navigate = useNavigate();
    const params = useParams();

    const handleClick = () => {
        navigate(`/movie/${id}`, { state: { movie: { id, poster, title, rating, overview, release_date } } });
    };

    const handleMouseOver = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'block';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'none';
    };

    return (
        <MovieBox key={id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
            <Poster src={poster} alt="poster" />
            <MovieBoxBottom>
                <div className="titleBox" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "90%" }}>
                    <SubTitle style={{ width: "70%" }}>{title}</SubTitle>
                    <div className="rating" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        <FaStar style={{ width: "1rem", height: "1rem", color: "#FFCC15" }} />
                        <SubTitle>{rating}</SubTitle>
                    </div>
                </div>
            </MovieBoxBottom>

            <OverExplain className="overExplain">
                <OverTitle>{title}</OverTitle>
                <OverView>{overview}</OverView>
            </OverExplain>
        </MovieBox>
    );
};

export default ItemResult;

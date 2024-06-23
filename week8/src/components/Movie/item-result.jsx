import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const MovieBox = styled.div`
    width: 80%;
    padding: 9.6px; // 0.5vw를 1920px 기준으로 변환
    margin: 19.2px; // 1vw를 1920px 기준으로 변환
    position: relative;
    cursor: pointer;
`

const Poster = styled.img`
    width: 100%;
    height: 288px; // 15vw를 1920px 기준으로 변환
`

const MovieBoxBottom = styled.div`
    width: 100%;
    height: 76.8px; // 4vw를 1920px 기준으로 변환
    padding-top: 9.6px; // 0.5vw를 1920px 기준으로 변환
    background-color: #383B67;
    display: flex;
    justify-content: center;
`

const SubTitle = styled.p`
    font-size: 11.52px; // 0.6vw를 1920px 기준으로 변환
    color: #FFFFFF;
`

const OverExplain = styled.div`
    position: absolute;
    top: 2%;
    left: 3.5%;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.8;
    color: white;
    font-size: 9.6px; // 0.5vw를 1920px 기준으로 변환
    width: 93%;
    height: 96%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: none;
`;

const OverTitle = styled.p`
    padding: 9.6px; // 0.5vw를 1920px 기준으로 변환
    font-size: 11.52px; // 0.6vw를 1920px 기준으로 변환
`;

const OverView = styled.p`
    padding: 9.6px; // 0.5vw를 1920px 기준으로 변환
    padding-right: 9.6px; // 0.5vw를 1920px 기준으로 변환
`;

const ItemResult = ({id, poster, original_title, title, rating, overview, release_date}) => {
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
            <Poster src={poster} alt="poster"/>
            <MovieBoxBottom>
                <div className="titleBox" style={{display: "flex", justifyContent: "space-between", alignItems:"flex-start", width: "90%"}}>
                    <SubTitle style={{width: "70%"}}>{title}</SubTitle>
                    <div className="rating" style={{display: "flex", alignItems: "center", gap: "3.84px"}}> {/* 0.2vw를 1920px 기준으로 변환 */}
                        <FaStar style={{width: "9.6px", height: "9.6px", color: "#FFCC15"}}/> {/* 0.5vw를 1920px 기준으로 변환 */}
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

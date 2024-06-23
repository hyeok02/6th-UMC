import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const MovieBox = styled.div`
    width: 90%;
    margin: 19.2px 9.6px; // 1vw, 0.5vw를 1920px 기준으로 변환
    position: relative;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 100%;
        margin: 15.36px 0; // 2vw를 768px 기준으로 변환
    }
`;

const Poster = styled.img`
    width: 100%;
    height: 288px; // 15vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        height: auto;
    }
`;

const MovieBoxBottom = styled.div`
    width: 100%;
    height: 67.2px; // 3.5vw를 1920px 기준으로 변환
    padding-top: 9.6px; // 0.5vw를 1920px 기준으로 변환
    background-color: #383B67;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        height: auto;
        padding: 15.36px; // 1vw를 768px 기준으로 변환
    }
`;

const SubTitle = styled.p`
    font-size: 11.52px; // 0.6vw를 1920px 기준으로 변환
    color: #FFFFFF;

    @media (max-width: 768px) {
        font-size: 15.36px; // 2vw를 768px 기준으로 변환
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
    font-size: 9.6px; // 0.5vw를 1920px 기준으로 변환
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: none;

    @media (max-width: 768px) {
        font-size: 11.52px; // 1.5vw를 768px 기준으로 변환
    }
`;

const OverTitle = styled.p`
    padding: 9.6px; // 0.5vw를 1920px 기준으로 변환
    font-size: 11.52px; // 0.6vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        font-size: 13.824px; // 1.8vw를 768px 기준으로 변환
    }
`;

const OverView = styled.p`
    padding: 9.6px; // 0.5vw를 1920px 기준으로 변환
    padding-right: 9.6px; // 0.5vw를 1920px 기준으로 변환

    @media (max-width: 768px) {
        padding: 23.04px; // 1.5vw를 768px 기준으로 변환
    }
`;

const ItemMovie = ({ id, poster, title, rating, overview }) => {
    const handleMouseOver = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'block';
    };

    const handleMouseOut = (e) => {
        e.currentTarget.querySelector('.overExplain').style.display = 'none';
    };

    return (
        <MovieBox key={id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Poster src={poster} alt="poster" />
            <MovieBoxBottom>
                <div className="titleBox" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "90%" }}>
                    <SubTitle style={{ width: "70%" }}>{title}</SubTitle>
                    <div className="rating" style={{ display: "flex", alignItems: "center", gap: "3.84px" }}> {/* 0.2vw를 1920px 기준으로 변환 */}
                        <FaStar style={{ width: "9.6px", height: "9.6px", color: "#FFCC15" }} /> {/* 0.5vw를 1920px 기준으로 변환 */}
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

export default ItemMovie;

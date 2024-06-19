import ListMovie from "../components/Movie/ListMovie";
import PageContainer from "../components/Style/PageStyle";

const NowPlaying = () => {
    return (
        <PageContainer>
            <ListMovie Url="https://api.themoviedb.org/3/movie/now_playing" mode="infinite"/>
        </PageContainer>
    )
}

export default NowPlaying;
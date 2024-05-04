import ListMovie from "../components/Movie/list-movie";
import PageContainer from "../components/Style/PageStyle";

const TopRated = () => {
    return (
        <PageContainer>
            <ListMovie Url="https://api.themoviedb.org/3/movie/top_rated"/>
        </PageContainer>
    )
}

export default TopRated;
import ListMovie from "../components/Movie/ListMovie";
import PageContainer from "../components/Style/PageStyle";

const PopularPage = () => {
    return (
        <PageContainer>
            <ListMovie Url="https://api.themoviedb.org/3/movie/popular"/>
        </PageContainer>
    )
}

export default PopularPage;
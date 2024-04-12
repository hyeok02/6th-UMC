import { movies } from './API.jsx';
import Movie from './components/movie.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {movies.results.map((item) => (
        <Movie key={item.id} movieData={item} />
      ))}
    </div>
  );
}

export default App;
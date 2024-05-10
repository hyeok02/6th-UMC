import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import GlobalStyle from './components/Style/GlobalStyle';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MainPage from './page/MainPage';
import PopularPage from './page/PopularPage';
import NowPlaying from './page/NowPlaying';
import TopRated from './page/TopRated';
import UpComing from './page/UpComing';
import MovieDetailPage from './page/MovieDetailPage';
import NotFoundPage from './page/NotFoundPage';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/popular" element={<PopularPage/>} />
          <Route path="/now" element={<NowPlaying/>} />
          <Route path="/top" element={<TopRated/>} />
          <Route path="/up" element={<UpComing/>} />
          <Route path="/movie/:id" element={<MovieDetailPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App;
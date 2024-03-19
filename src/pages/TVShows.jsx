import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailabel'; // Corrected import statement
import styled from 'styled-components';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';

function TVShows() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.watch.genresLoaded);
  const movies = useSelector((state) => state.watch.movies);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.watch.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
   
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);
  

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
      <SelectGenre genres={genres} type="tv" />
      {movies && movies.length ? <Slider movies={movies} /> : <NotAvailable />}
    </div>
  </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default TVShows;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersLikedMovies } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';

export default function UserLikedMovies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.watch.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users'); 
        if (response.data && response.data.length > 0) {
          const userEmail =  window.localStorage.getItem("email");
          dispatch(getUsersLikedMovies(userEmail)); 
          console.log(userEmail)
        } else {
          console.log('Aucune donnée utilisateur trouvée');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        navigate('/login');
      }
    };

    fetchUserData(); 
  }, [dispatch, navigate]);
  

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Ma liste</h1>
        <div className="grid flex">
      {movies && movies.length > 0 ? (
        movies.map((movie, index) => (
          <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
        ))
        
      ) : (
        <p>No movies found</p>
      )}
    </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
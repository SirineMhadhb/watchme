import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/video.mp4";



export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  
  const checkAuthentication = () => {
    // Votre logique de vérification d'authentification
    // Par exemple, vous pouvez vérifier l'existence d'un jeton JWT dans les cookies
    const token = localStorage.getItem('token'); // Supposons que le jeton soit stocké dans localStorage
    
    return !!token; // Retourne true si l'utilisateur est authentifié, sinon false
  }
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const userIsLoggedIn = checkAuthentication();
  
        setIsLoggedIn(userIsLoggedIn);
  
        if (userIsLoggedIn) {
          await fetchUserData(); // Récupérez les données de l'utilisateur s'il est connecté
        } else {
          navigate("/login"); // Redirigez vers la page de connexion s'il n'est pas connecté
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion de l'utilisateur :", error);
        navigate("/login");
      }
    };
  
    checkLoggedInStatus();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/");
      // Update email if the response contains an email property
      if (response.data && response.data.length > 0) {
        response.data.forEach((user) => {
          setEmail(user.email); // Set email if available
        });
      } else {
        console.log("No user data found");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  const addToList = async () => {
    console.log(" ");
    const Email = localStorage.getItem('email');
    if (isLoggedIn) {
      try {
        await axios.post("http://localhost:3001/api/users/add", {
          email : Email ,
          data: movieData,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
    
  };
 
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
  <ul className="flex">
    {movieData.genres.map((genre, index) => (
      <li key={index}>{genre}</li>
    ))}
  </ul>
</div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
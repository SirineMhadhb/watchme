import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";


export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    // Check if 'movies' is defined before using 'slice'
    if (movies) {
      return movies.slice(from, to);
    }
    return []; // Or handle the case when movies is undefined
  };
 
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
      <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
      <CardSlider
        data={getMoviesFromRange(20, 30)}
        title="Blockbuster Movies"
      />
      <CardSlider
        data={getMoviesFromRange(30, 40)}
        title="Popular"
      />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
    </Container>
  );
}

const Container = styled.div``;
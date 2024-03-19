import { configureStore , createAsyncThunk , 
  createSlice } from "@reduxjs/toolkit" ; 
  
  import { API_KEY, TMBD_BASE_URL } from "../utils/constants";
  import axios from 'axios';
  
  const initialState = {
      movies : [] ,
      genresLoaded : false ,
      genres : []
  } ; 
  
  export const getGenres = createAsyncThunk("watch/genres", async () => {
      const {
        data: { genres },
      } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a7a70a7e56bd8c453a8090b76342e938"
      );
      
      return genres;
    });
    const createArrayFromRawData = (array, moviesArray, genres) => {
      array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
          const name = genres.find(({ id }) => id === genre);
          if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
          moviesArray.push({
            id: movie.id,
            name: movie?.original_name ? movie.original_name : movie.original_title,
            image: movie.backdrop_path,
            genres: movieGenres.slice(0, 3),
          });
      });
    };
  
    const getRawData = async (api, genres, paging = false) => {
      const moviesArray = [];
      for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
          data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
      
      
      
    };
   
    return moviesArray;
  }
   
    export const fetchDataByGenre = createAsyncThunk(
      "watch/genre",
      async ({ genre, type }, thunkAPI) => {
        const {
          watch: { genres },
        } = thunkAPI.getState();
        return getRawData(
          `https://api.themoviedb.org/3/discover/${type}?api_key=a7a70a7e56bd8c453a8090b76342e938&with_genres=${genre}`,
          genres
          
          
        );
       
      }
      
    );
  
    export const fetchMovies = createAsyncThunk(
      "watch/trending",
      async ({ type }, thunkAPI) => {
        const {
          watch: { genres },
        } = thunkAPI.getState();
        return getRawData(
          `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
          genres,
          true
        );
        
      }

      
    );
    export const getUsersLikedMovies = createAsyncThunk(
      "watch/getLiked",
      async (email) => {
        const {
          data: { movies },
        } = await axios.get(`http://localhost:3001/api/users/liked/${email}`);
       
        return movies;
        
      }
      
    );
    
    export const removeMovieFromLiked = createAsyncThunk(
      "watch/deleteLiked",
      async ({ movieId, email }) => {
        const {
          data: { movies },
        } = await axios.put("http://localhost:3001/api/users/remove", {
          email,
          movieId,
        });
        return movies;
      }
    );
  
  const WatchSlice = createSlice({
      name : "watch",

      initialState,
  reducers: {
    setGenres: (state, action) => {
      
      state.genres = action.payload;
    },
    setMovies: (state, action) => {
      
      state.movies = action.payload;
    },
  },
      extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
          state.genres = action.payload;
          state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
          state.movies = action.payload;
        });
      },
    });
    
    export const { setGenres, setMovies } = WatchSlice.actions;
    export const store = configureStore({
      reducer: {
        watch: WatchSlice.reducer,
      },
    });
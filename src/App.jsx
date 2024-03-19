import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Watch from '././pages/Watch'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Pay from './components/payement'

import UserLiked from './pages/UserLiked'

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="/signup" element={<Signup/>}/>
    <Route exact path="/player" element={<Player/>}/>
    <Route exact path="/watch" element={<Watch/>}/>
    <Route exact path="/movies" element={<Movies/>}/>
    <Route exact path="/tv" element={<TVShows/>}/>
    <Route exact path="/mylist" element={<UserLiked/>}/>
    <Route exact path="/pay" element={<Pay/>}/>
    
  </Routes>
  
  </BrowserRouter>
  )
}


import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo  from '../assets/logo.png'
export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className='flex a-center j-between'>
      <div className='logo'>
        {/* i5Tar taswira o5ra fiha kilmit watch me */}
        <img src={logo} alt='logo'/>   
      </div>
      
    </Container>
  )
}

const Container = styled.div`
padding: 0 4rem;
.logo {
  img {
    height: 5rem;
  }
}
button {
  padding: 0.5rem 1rem;
  background-color: #e50914;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 0.2rem;
  font-weight: bolder;
  font-size: 1.05rem;
}
`;
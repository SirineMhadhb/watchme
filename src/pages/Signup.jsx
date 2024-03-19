import React, { useState } from "react";

import styled from 'styled-components'
import Header from '../components/Header';
import BackgoundImage from '../components/BackgoundImage';
function Signup() {
  const [showPassword , setShowPassword]=useState(false)
  const [formValues , setformValues]=useState( {
    email:" " ,
    password : " ",
  }
  ) ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
      

      console.log(email, password);
      fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
          
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
        
          
            alert(data.msg);
            if (data.status === "notokmail") {
              
              
              window.location.href = "/signup";
              
            }
            else
            {
              window.location.href = "/pay";
              window.localStorage.setItem("token", data.token);
          
              window.localStorage.setItem("loggedIn", true);
              window.localStorage.setItem("email", data.email);
            }

           
          
        });
    
  };
  return (
  <Container showPassword={showPassword}>
    <BackgoundImage/>
    <form onSubmit={handleSubmit}>
    <div className="content">
        <Header login/>

    <div className="body flex column a-center j-center">

    <div className='text flex cloumn'>
        <h1>
            unlimeted movie , tv shows and more 
        </h1>
        

    </div>
    <div className="form">
     <input type='email' placeholder='Email address' name='email'  onChange={(e) => setEmail(e.target.value)}
   />
     {
      showPassword && 
    
     <input type='password' placeholder='Password' name='password'
     onChange={(e) => setPassword(e.target.value)}  /> }
     {
      !showPassword && <button onClick={()=>setShowPassword(true)} >Get Started</button>}
     <div>
     <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
          </p>
    </div>

    </div>
    </div>
    </form>
  </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
        showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
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
    }
  }
`;

export default Signup;
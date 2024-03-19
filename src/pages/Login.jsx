import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgoundImage";
import Header from "../components/Header";

function Login( ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:3001/api/auth/login_user", {
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
        if (data.status === "usernotok") {
            alert(data.msg);
            
          }
          if (data.status === "passnotok") {
            alert(data.msg);
            
          }
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.token);
          
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("email", data.email);

          window.location.href = "./watch";
        }
      });
  }

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <form onSubmit={handleSubmit}> {/* Enclosing the form */}
              <div className="container flex column">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <p className="forgot-password text-right">
            create your account <a href="/signup">sign in?</a>
          </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
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
    }
  }
`;
export default Login;
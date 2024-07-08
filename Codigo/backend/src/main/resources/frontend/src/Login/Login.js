// src/Login/Login.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { UserContext } from "../UserContext";
import "./Login.css";
import Register from "../Register/Register";

function Login() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8080/usuario/get/${cpf}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const hashedPassword = CryptoJS.MD5(password).toString();
          if (response.data.senha === hashedPassword) {
            setUser(response.data); // Armazena os dados do usuário no contexto
            navigate("/courtList"); // Redireciona para /courtList
          } else {
            setFeedbackMessage("CPF ou senha incorretos.");
            setIsSuccess(false);
          }
        } else {
          setFeedbackMessage("Usuário não encontrado.");
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        setFeedbackMessage("Erro ao buscar usuário.");
        setIsSuccess(false);
        console.error("Erro ao buscar usuário:", error);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        {showRegisterForm ? (
          <Register toggleRegisterForm={toggleRegisterForm} />
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={cpf}
                  onChange={handleCpfChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
              <button
                type="button"
                onClick={toggleRegisterForm}
                className="submit-button"
              >
                Cadastrar Usuário
              </button>
            </form>
            {feedbackMessage && (
              <div
                className={`feedback-message ${
                  isSuccess ? "success" : "error"
                }`}
              >
                {feedbackMessage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

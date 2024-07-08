import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

function Register({ toggleRegisterForm }) {
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/usuario/insert", formData)
      .then(function (response) {
        setFeedbackMessage("Usuário registrado com sucesso!");
        setIsSuccess(true);
      })
      .catch(function (error) {
        setFeedbackMessage("Erro ao registrar usuário. Tente novamente.");
        setIsSuccess(false);
      });
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-title-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close-button"
          onClick={toggleRegisterForm}
        />
        <h2 className="cadastro-title">Cadastrar</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      {feedbackMessage && (
        <div className={`feedback-message ${isSuccess ? "success" : "error"}`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}

export default Register;

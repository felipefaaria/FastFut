import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyGames.css";
import Modal from "react-modal";
import Footer from "../Footer/Footer";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function MyGames() {
  const [matches, setMatches] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newMatch, setNewMatch] = useState({
    id: "",
    title: "",
    sport: "",
    data: "",
    num_jogadores: "",
    court_name: "",
    court_type: "",
    status: "",
  });

  useEffect(() => {
    listarPartidas();
  }, []);

  const listarPartidas = () => {
    axios
      .get("http://localhost:8080/partida/list")
      .then((response) => {
        const array = response.data;
        console.log(array);
        setMatches(array); // Atualiza o estado com os dados recebidos da API
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelMatch = (id) => {
    setMatches(matches.filter((match) => match.id !== id));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updateSport = (sport) => {
    setNewMatch((prevMatch) => ({
      ...prevMatch,
      sport,
    }));
  };

  const updateCourtType = (courtType) => {
    setNewMatch((prevMatch) => ({
      ...prevMatch,
      court_type: courtType,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatch((prevMatch) => ({
      ...prevMatch,
      [name]: value,
    }));
  };

  const handleAddMatch = (e) => {
    e.preventDefault();

    const inserirPartida = () => {
      axios
        .post("http://localhost:8080/partida/insert", newMatch)
        .then(function (response) {
          console.log(response.data);
          setMatches([...matches, response.data]);
          closeModal();
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    inserirPartida();
    listarPartidas();
  };

  return (
    <div className="mygames-container">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <Link className="logo-link" to="/courtList">
              <FontAwesomeIcon icon={faFutbol} />
              FastFut
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/courtList">Quadras Disponíveis</Link>
            </li>
            <li>
              <Link to="/mygames">Minhas Partidas</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="match-content">
        <h2 className="match-title">Minhas Partidas</h2>
        <button className="add-match-btn" onClick={openModal}>
          Adicionar Nova Partida
        </button>
        <div className="match-list">
          {matches.map((match) => (
            <div key={match.id} className="match">
              <div className="match-list-title-container">
                <h3 className="match-list-title">{match.title}</h3>
                <div>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close-button"
                    onClick={() => handleCancelMatch(match.id)}
                  />
                </div>
              </div>
              <p>
                <strong>Esporte Praticado:</strong> {match.sport}
              </p>
              <p>
                <strong>Data:</strong> {match.data}
              </p>
              <p>
                <strong>Numero de Jogadores:</strong> {match.num_jogadores}
              </p>
              <p>
                <strong>Nome da Quadra:</strong> {match.court_name}
              </p>
              <p>
                <strong>Tipo de Quadra:</strong> {match.court_type}
              </p>
              <p>
                <strong>Status:</strong> {match.status}
              </p>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Adicionar Nova Partida"
          className="add-match-modal"
          overlayClassName="add-match-modal-overlay"
        >
          <h2>Adicionar Nova Partida</h2>
          <div className="add-modal-content">
            <div className="image-analyzer-ia">
              <ImageAnalyzer
                updateSport={updateSport}
                updateCourtType={updateCourtType}
              />
            </div>
            <form className="add-modal-form" onSubmit={handleAddMatch}>
              <div className="input-group">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={newMatch.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newMatch.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="sport">Esporte</label>
                <input
                  type="text"
                  id="sport"
                  name="sport"
                  value={newMatch.sport}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="data">Data</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={newMatch.data}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="num_jogadores">Numero de Jogadores</label>
                <input
                  type="number"
                  id="num_jogadores"
                  name="num_jogadores"
                  value={newMatch.num_jogadores}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="court_name">Nome da Quadra</label>
                <input
                  type="text"
                  id="court_name"
                  name="court_name"
                  value={newMatch.court_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="courtType">Tipo de Quadra</label>
                <input
                  type="text"
                  id="court_type"
                  name="court_type"
                  value={newMatch.court_type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="status">Status da Partida</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={newMatch.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Adicionar Partida
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="add-match-modal-cancel-btn"
              >
                Cancelar
              </button>
            </form>
          </div>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default MyGames;

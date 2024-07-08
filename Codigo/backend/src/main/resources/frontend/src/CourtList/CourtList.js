import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import emailjs from "emailjs-com";
import Lottie from "react-lottie";
import LoadingLottie from "../assets/lotties/LoadingLottie.json";
import "./CourtList.css";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import ImagemQuadra1 from "../assets/img/imagem-quadra-1.jpg";
import ImagemQuadra2 from "../assets/img/imagem-quadra-2.jpg";
import ImagemQuadra3 from "../assets/img/imagem-quadra-3.jpg";
import ImagemQuadra4 from "../assets/img/imagem-quadra-4.jpg";
import ImagemQuadra5 from "../assets/img/imagem-quadra-5.jpg";

const customStyles = {
  content: {
    width: "50%",
    height: "70%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

const CourtList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState(null);
  const [date, setDate] = useState("");
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  const emailServiceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const emailTemplateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const emailUserId = process.env.REACT_APP_EMAIL_USER_ID;

  const courtImages = {
    1: ImagemQuadra1,
    2: ImagemQuadra2,
    3: ImagemQuadra3,
    4: ImagemQuadra4,
    5: ImagemQuadra5,
  };

  useEffect(() => {
    const listarQuadras = async () => {
      try {
        const response = await axios.get("http://localhost:8080/quadra/list");
        console.log(response.data);
        setCourts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar as quadras.");
        setLoading(false);
      }
    };

    listarQuadras();
  }, [user]);

  const filteredCourts = courts.filter((court) =>
    court.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookingClick = (courtId) => {
    setSelectedCourtId(courtId);
    setShowModal(true);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(emailServiceId, emailTemplateId, e.target, emailUserId)
      .then(
        (result) => {
          console.log(result.text);
          alert("E-mail enviado com sucesso!");
          setShowModal(false);
        },
        (error) => {
          console.log(error.text);
          alert("Erro ao enviar e-mail.");
        }
      );
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-overlay"></div>
        <Lottie
          options={defaultOptions}
          height={250}
          width={250}
          style={{ zIndex: 2 }}
        />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const selectedCourt = courts.find((court) => court.id === selectedCourtId);

  return (
    <div className="court-list-page">
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
      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar pelo nome da quadra"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="court-list">
          {filteredCourts.map((court) => (
            <li key={court.id} className="court-item">
              <img
                src={courtImages[court.id] || ImagemQuadra1}
                alt={court.nome}
                className="court-image"
              />
              <div className="court-info">
                <h3>{court.nome}</h3>
                <p>Localização: {court.endereco}</p>
              </div>
              <button
                onClick={() => handleBookingClick(court.id)}
                className="booking-button"
              >
                Marcar Partida
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Modal de Agendamento"
      >
        <div className="modal-container">
          <div className="court-info-modal">
            <img
              src={courtImages[selectedCourt?.id] || ImagemQuadra1}
              alt="Quadra"
              className="court-image-modal"
            />
          </div>
          <div className="booking-modal-form-container">
            <form className="booking-modal-form" onSubmit={sendEmail}>
              <h2 className="court-modal-title">
                Agendamento de Quadras - {selectedCourt?.nome}
              </h2>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                className="modal-input"
                required
              />
              <label htmlFor="sport">Esporte Praticado:</label>
              <input
                type="text"
                id="sport"
                name="sport"
                className="modal-input"
                required
              />
              <label htmlFor="date">Data:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="modal-input"
                value={date}
                onChange={handleDateChange}
                required
              />
              <label htmlFor="time">Hora:</label>
              <input
                type="time"
                id="time"
                name="time"
                className="modal-input"
                required
              />
              <input
                type="hidden"
                name="court_name"
                value={selectedCourt?.nome}
              />
              <input
                type="hidden"
                name="court_location"
                value={selectedCourt?.endereco}
              />
              <input type="hidden" name="user_login" value={user.email} />
              <input type="hidden" name="user_nome" value={user.nome} />
              <button type="submit" className="modal-button">
                Agendar Partida
              </button>
              <button
                type="button"
                className="modal-button-close"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourtList;

import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faTrophy,
  faRankingStar,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";

// Importando as imagens
import Img1 from "../assets/img/carrousel-img-1.jpg";
import Img2 from "../assets/img/carrousel-img-2.jpg";
import Img3 from "../assets/img/carrousel-img-3.jpg";
import Img4 from "../assets/img/carrousel-img-4.jpg";

function Home() {
  return (
    <div className="container">
      <Navbar />

      <div className="container-chamada">
        <h1 className="chamada-title">Bem-vindo ao FastFut</h1>
        <p className="chamada-desc">
          Encontre e organize jogos de futebol amador na sua região!
        </p>

        <button className="chamada-button">
          <p className="chamada-button-title">Saiba Mais</p>
        </button>
      </div>

      <div className="quadrados-container">
        <div className="quadrado azul-escuro">
          <FontAwesomeIcon className="icone" icon={faUserGroup} />
          <p className="quadrado-title">Reuna seus amigos</p>
        </div>
        <div className="quadrado azul-claro">
          <FontAwesomeIcon className="icone" icon={faTrophy} />
          <p className="quadrado-title">Participe de Campeonatos</p>
        </div>
        <div className="quadrado azul-escuro">
          <FontAwesomeIcon className="icone" icon={faRankingStar} />
          <p className="quadrado-title">Se destaque</p>
        </div>
        <div className="quadrado azul-claro">
          <FontAwesomeIcon className="icone" icon={faCalendar} />
          <p className="quadrado-title">Marque sua Pelada</p>
        </div>
      </div>

      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          showStatus={false}
          className="carousel-view"
        >
          <div>
            <img
              src={Img1}
              alt="Partida de futebol 1"
              className="carousel-img"
            />
          </div>
          <div>
            <img
              src={Img2}
              alt="Partida de futebol 2"
              className="carousel-img"
            />
          </div>
          <div>
            <img
              src={Img3}
              alt="Partida de futebol 3"
              className="carousel-img"
            />
          </div>
          <div>
            <img
              src={Img4}
              alt="Partida de futebol 4"
              className="carousel-img"
            />
          </div>
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

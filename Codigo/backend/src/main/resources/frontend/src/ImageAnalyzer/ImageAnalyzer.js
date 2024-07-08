import React, { useState, useRef } from "react";
import Lottie from "react-lottie";
import ImageLottie from "../assets/lotties/ImageIALottie.json";
import "./ImageAnalyzer.css";

function ImageAnalyzer({ updateSport, updateCourtType }) {
  const subscriptionKey = "a69c1bff372b4439b4ee6a9b93d813fc"; // Substitua pela sua chave de API
  const endpoint =
    "https://fastfutsite.cognitiveservices.azure.com/vision/v3.1/analyze"; // Substitua pelo seu endpoint
  const params = "?visualFeatures=Tags&language=pt";

  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      await analyzeImage(file);
    }
  };

  const analyzeImage = async (file) => {
    if (!file) {
      alert("Favor selecionar a imagem.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const response = await fetch(endpoint + params, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Content-Type": "application/octet-stream",
        },
        body: arrayBuffer,
      });

      if (!response.ok) {
        throw new Error("Erro ao analisar imagem: " + response.statusText);
      }

      const result = await response.json();
      setTags(result.tags);
      console.log(result.tags);

      // Verifica as tags para determinar o esporte
      const sportsTags = result.tags.map((tag) => tag.name.toLowerCase());
      if (sportsTags.includes("futebol")) {
        if (sportsTags.includes("campo")) {
          updateSport("Futebol");
          updateCourtType("Campo de Futebol");
        }
        if (sportsTags.includes("piso")) {
          updateSport("Futebol");
          updateCourtType("Quadra de Futsal");
        }
      } else if (sportsTags.includes("bola de vôlei")) {
        if (sportsTags.includes("praia")) {
          updateSport("Vôlei");
          updateCourtType("Quadra de Areia");
        }
        if (sportsTags.includes("voleibol")) {
          updateSport("Vôlei");
          updateCourtType("Quadra de Vôlei");
        }
      } else if (sportsTags.includes("basquete")) {
        updateSport("Basquete");
        updateCourtType("Quadra de Basquete");
      } else if (sportsTags.includes("tênis")) {
        updateSport("Tênis");
        updateCourtType("Quadra de Tênis");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao analisar imagem: " + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ImageLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-analyzer-container">
      <input
        type="file"
        id="imageInput"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={handleButtonClick}>
        <Lottie
          options={defaultOptions}
          height={250}
          width={250}
          style={{ cursor: "pointer" }}
        />
      </button>
      <div className="image-analyzer-text">
        <h1 className="image-analyzer-title">Preenchimento Automático IA</h1>
        <p className="image-analyzer-desc">
          Faça o upload de uma imagem da sua partida e deixe nossa IA avançada
          fazer o trabalho por você! Simplifique o preenchimento do formulário e
          economize tempo.
        </p>
      </div>
    </div>
  );
}

export default ImageAnalyzer;

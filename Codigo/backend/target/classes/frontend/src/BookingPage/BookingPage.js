import React from "react";
import { useParams } from "react-router-dom";

const BookingPage = ({ courts }) => {
  // UseParams para obter o parâmetro da URL (courtId)
  const { courtId } = useParams();

  // Encontrar a quadra com base no courtId fornecido
  const court = courts.find((court) => court.id === parseInt(courtId));

  // Se a quadra não for encontrada, mostrar uma mensagem de erro
  if (!court) {
    return <div>Quadra não encontrada</div>;
  }

  return (
    <div className="booking-page">
      <h1>Agendamento de Partida - {court.name}</h1>
      <img src={court.image} alt={court.name} className="court-image" />
      <p>Endereço: {court.address}</p>
      {/* Formulário de agendamento aqui */}
    </div>
  );
};

export default BookingPage;

// src/components/UserProfile.js
import React from "react";
import "./Profile.css";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <img
        src="https://via.placeholder.com/150"
        alt="User Profile"
        className="profile-image"
      />
      <div className="user-info">
        <div className="user-info-item">
          <strong>Nome:</strong> João Silva
        </div>
        <div className="user-info-item">
          <strong>CPF:</strong> 123.456.789-00
        </div>
        <div className="user-info-item">
          <strong>Login:</strong> joao.silva
        </div>
        <div className="user-info-item">
          <strong>Senha:</strong> ********
        </div>
        <div className="user-info-item">
          <strong>Localização:</strong> São Paulo, Brasil
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

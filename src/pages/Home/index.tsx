import React from "react";
import { FiLogIn } from "react-icons/fi";
import "./Home.css";

import { describeHome, homeMessage } from "../../common/strings";
import Logo from "../../assets/logo.svg";

export const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={Logo} alt="Ecoleta" />
        </header>

        <main>
          <h1> {describeHome}</h1>
          <p>{homeMessage}</p>

          <a href="">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </a>
        </main>
      </div>
    </div>
  );
};

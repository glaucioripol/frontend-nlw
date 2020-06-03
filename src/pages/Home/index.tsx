import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./Home.css";

import {
  describeHome,
  homeMessage,
  registerNewPointText,
} from "../../common/strings";
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

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>{registerNewPointText}</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

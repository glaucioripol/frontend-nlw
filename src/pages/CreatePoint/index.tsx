import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./CreatePoint.css";

import {
  nameApp,
  goBackHome,
  registerNewPointCollect,
  dataText,
  itemsCollectText,
  addressText,
  entityName,
  email as emailString,
  Whatsapp,
  selectAdressAfter,
  selectOneOrMoreItemsText,
  unitedFederation,
  cityText,
  registerNewPointOfColectText,
} from "../../common/strings";
import Logo from "../../assets/logo.svg";

export const CreatePoint: React.FC = () => (
  <div id="page-create-point">
    <header>
      <img src={Logo} alt={nameApp} />
      <Link to="/">
        <FiArrowLeft />
        {goBackHome}
      </Link>
    </header>

    <form>
      <h1 dangerouslySetInnerHTML={{ __html: registerNewPointCollect }} />

      <fieldset>
        <legend>
          <h2>{dataText}</h2>
        </legend>

        <div className="field">
          <label htmlFor="name">{entityName}</label>
          <input id="name" name="name" type="text" />
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">{emailString}</label>
            <input id="email" name="email" type="text" />
          </div>
          <div className="field">
            <label htmlFor="whatsapp">{Whatsapp}</label>
            <input id="whatsapp" name="whatsapp" type="text" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>{addressText}</h2>
          <span>{selectAdressAfter}</span>
        </legend>

        <div className="field-group">
          <div className="field">
            <label htmlFor="uf">{unitedFederation}</label>
            <select name="uf" id="uf">
              <option value="0">Selecione uma UF</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="city">{cityText}</label>
            <select name="city" id="city">
              <option value="0">Selecione uma Cidade</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>{itemsCollectText}</h2>
          <span>{selectOneOrMoreItemsText}</span>
        </legend>

        <ul className="items-grid">
          <li className="selected">
            <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
            <span>Oleo de cozinha</span>
          </li>
        </ul>
      </fieldset>

      <button>{registerNewPointOfColectText}</button>
    </form>
  </div>
);

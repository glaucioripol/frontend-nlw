import React, { useEffect, useState, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import "./CreatePoint.css";

import { api } from "../../services/api";
import { retrieveUF, retrieveCities } from "../../services/api/ibge";

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

interface IItemResponse {
  id: number;
  image_url: string;
  title: string;
}

export const CreatePoint: React.FC = () => {
  const { push } = useHistory();
  const [itemsCollect, setItemsCollect] = useState<IItemResponse[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setInitialPosition([latitude, longitude]);
    });
  }

  useEffect(getCurrentLocation, []);

  const [UFNames, setUFNames] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>("0");

  const [cityNames, setCityNames] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("0");

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [inputTextForm, setInputTextForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // handles
  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    api.post("/points", {
      image: "nudes",
      name: inputTextForm.name,
      email: inputTextForm.email,
      whatsapp: inputTextForm.whatsapp,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
      city: selectedCity,
      uf: selectedUF,
      items: selectedItems,
    });
    push("/");
  }

  function handleChangeUF(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedUF(value);
  }
  function handleChangeCity(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedCity(value);
  }

  function handleClickMap(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputTextForm({ ...inputTextForm, [name]: value });
  }

  function handleSelecItem(id: number) {
    return () => {
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((item) => item !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    };
  }
  // requests
  function retrieveItemsToCollect(): void {
    api
      .get("/items")
      .then(({ data: { data } }) => setItemsCollect(data))
      .catch((err) => console.error(err));
  }
  useEffect(retrieveItemsToCollect, []);

  function retrieveUFs() {
    retrieveUF().then(({ data }) => {
      const ufNames = data.map(({ sigla }) => sigla);
      setUFNames(ufNames);
    });
  }
  useEffect(retrieveUFs, []);

  function retrieveCitiesReq() {
    retrieveCities(selectedUF).then(({ data }) => {
      const cities = data.map(({ nome }) => nome);
      setCityNames(cities);
    });
  }
  useEffect(retrieveCitiesReq, [selectedUF]);

  return (
    <div id="page-create-point">
      <header>
        <img src={Logo} alt={nameApp} />
        <Link to="/">
          <FiArrowLeft />
          {goBackHome}
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1 dangerouslySetInnerHTML={{ __html: registerNewPointCollect }} />

        <fieldset>
          <legend>
            <h2>{dataText}</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">{entityName}</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">{emailString}</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">{Whatsapp}</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>{addressText}</h2>
            <span>{selectAdressAfter}</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleClickMap}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">{unitedFederation}</label>
              <select name="uf" id="uf" onChange={handleChangeUF}>
                <option value="0">Selecione uma UF</option>
                {UFNames.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">{cityText}</label>
              <select name="city" id="city" onChange={handleChangeCity}>
                <option value="0">Selecione uma Cidade</option>
                {cityNames.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
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
            {itemsCollect?.map(({ id, image_url, title }) => (
              <li
                key={id.toString()}
                onClick={handleSelecItem(id)}
                className={selectedItems.includes(id) ? "selected" : ""}
              >
                <img src={image_url} alt={title} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button>{registerNewPointOfColectText}</button>
      </form>
    </div>
  );
};

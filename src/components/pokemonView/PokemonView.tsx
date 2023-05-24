import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTitle from "../header/HeaderTitle";
import "./PokemonView.css";
import CustomButton from "../customButton/CustomButton";
import { DashboardMode } from "../../pages/dashboard/Dashboard";
import CustomInput from "../customInput/CustomInput";
import { Pokemon } from "../../types/pokemons";
import { API_BASE_URL, StatusCode } from "../../constants/api";
import Toast, { TOAST_LAPSE } from "../toast/Toast";

interface PokemonViewProps {
  pokemonViewMode: Omit<DashboardMode, "table">;
  handleCancel: () => void;
  selectedPokemonId?: number;
}

const pokemonDefaultValues: Pokemon = {
  id: 0,
  name: "",
  image: "",
  attack: 0,
  defense: 0,
  hp: 55,
  type: "Default",
  idAuthor: 1,
};

const PokemonView: React.FC<PokemonViewProps> = ({
  pokemonViewMode,
  handleCancel,
  selectedPokemonId,
}) => {
  const [pokemon, setPokemon] = useState(pokemonDefaultValues);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const isEditMode = pokemonViewMode === "edit" && selectedPokemonId;

  useEffect(() => {
    const getData = async () => {
      try {
        if (isEditMode) {
          const response = await axios.get(
            `${API_BASE_URL}/${selectedPokemonId}`
          );
          setPokemon(response.data);
        }
      } catch (err) {
        handleCancel();
      }
    };
    getData();
  }, []);

  const { name, image, attack, defense } = pokemon;

  const handleSavePokemon = async () => {
    const { id, ...pokemonProps } = pokemon;
    const method = isEditMode ? "put" : "post";
    const pathId = isEditMode ? selectedPokemonId : "";

    try {
      const response = await axios[method](
        `${API_BASE_URL}/${pathId}`,
        pokemonProps
      );
      if (response.status === StatusCode.POST_SUCCESS || StatusCode.SUCCESS) {
        handleCancel();
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, TOAST_LAPSE);
      }
    } catch (err) {
      setShowErrorToast(true);
      console.error(err);
      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  };

  const onCancel = () => {
    handleCancel();
  };

  const handleCloseToast = () => {
    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  const isSaveDisabled = !name || !image;

  return (
    <div className="pokemon-container">
      <HeaderTitle
        label={`${selectedPokemonId ? "Editar" : "Nuevo "} Pokemón`}
      />
      <div className="body">
        <div className="left-section">
          <div className="input-group">
            <label htmlFor="name-input">Nombre:</label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) =>
                setPokemon({
                  ...pokemon,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="image-input">Imagen:</label>
            <input
              id="image-input"
              type="text"
              value={image}
              onChange={(e) =>
                setPokemon({
                  ...pokemon,
                  image: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="right-section">
          <div className="slider-group">
            <label htmlFor="attack-slider">Ataque:</label>
            <input
              id="attack-slider"
              type="range"
              min={0}
              max={100}
              value={attack}
              onChange={(e) =>
                setPokemon({
                  ...pokemon,
                  attack: Number(e.target.value),
                })
              }
            />
            <span>{attack}</span>
          </div>
          <div className="slider-group">
            <label htmlFor="defense-slider">Defensa:</label>
            <input
              id="defense-slider"
              type="range"
              min={0}
              max={100}
              value={defense}
              onChange={(e) =>
                setPokemon({
                  ...pokemon,
                  defense: Number(e.target.value),
                })
              }
            />
            <span>{defense}</span>
          </div>
        </div>
      </div>
      <div className="button-section">
        <CustomButton
          label="Guardar"
          icon="diskette"
          onClick={handleSavePokemon}
          disabled={isSaveDisabled}
        />
        <CustomButton label="Cancelar" icon="x" onClick={onCancel} />
      </div>
      {showSuccessToast && (
        <Toast message="La operación fue exitosa" onClose={handleCloseToast} />
      )}
      {showErrorToast && (
        <Toast
          message="Hubo un error al tratar de realizar la solicitud"
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default PokemonView;

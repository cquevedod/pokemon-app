import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import SearchInput from "../../components/searchInput/SearchInput";
import CustomButton from "../../components/customButton/CustomButton";
import Table from "../../components/table/Table";
import { Pokemon } from "../../types/pokemons";
import { API_BASE_URL, StatusCode } from "../../constants/api";
import HeaderTitle from "../../components/header/HeaderTitle";
import PokemonView from "../../components/pokemonView/PokemonView";
import Toast, { TOAST_LAPSE } from "../../components/toast/Toast";

type Data = {
  original: Pokemon[];
  filtered?: Pokemon[];
};

export type DashboardMode = "table" | "new" | "edit";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Data>({ original: [], filtered: [] });
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>("table");
  const [selectedPokemonId, setSelectedPokemonId] = useState<Pokemon["id"]>();

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const isTableMode = dashboardMode === "table";

  const getData = async () => {
    try {
      if (isTableMode) {
        const response = await axios.get(`${API_BASE_URL}/?idAuthor=1`);
        setData({ original: response.data });
      }
    } catch (err) {
      setData({ original: [] });
      console.error(err);
      setShowErrorToast(true);

      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getData();
  }, [dashboardMode]);

  const handleButtonOnClick = () => {
    if (isTableMode) setDashboardMode("new");
  };

  const handleSearch = (enteredString: string) => {
    const dataFiltered = data.original?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(enteredString.toLowerCase())
    );
    setData({
      ...data,
      filtered: dataFiltered,
    });
  };

  const handleCancelPokemonView = () => {
    setDashboardMode("table");
    setSelectedPokemonId(undefined);
  };

  const handleEditPokemonView = (id: number) => {
    setDashboardMode("edit");
    setSelectedPokemonId(id);
  };

  const handleDeletePokemon = async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.status === StatusCode.SUCCESS) {
        setShowSuccessToast(true);
        getData();

        setTimeout(() => {
          setShowSuccessToast(false);
        }, TOAST_LAPSE);
      }
    } catch (err) {
      console.error(err);
      setShowErrorToast(true);

      setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
    }
  };

  const handleCloseToast = () => {
    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  const tableComponent = (
    <Table
      data={data.filtered?.length ? data.filtered : data.original}
      handleEdit={handleEditPokemonView}
      handleDelete={handleDeletePokemon}
    />
  );

  return (
    <div className="container">
      <HeaderTitle label="Listado de Pokemón" />
      <div className="control-section">
        <SearchInput onSearch={handleSearch} disabled={!isTableMode} />
        <CustomButton
          icon="plus"
          label="Nuevo"
          onClick={handleButtonOnClick}
          disabled={!isTableMode}
        />
      </div>
      <div className={`${dashboardMode}-container`}>
        {isTableMode ? (
          tableComponent
        ) : (
          <PokemonView
            pokemonViewMode={dashboardMode}
            handleCancel={handleCancelPokemonView}
            selectedPokemonId={selectedPokemonId}
          />
        )}
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

export default Dashboard;

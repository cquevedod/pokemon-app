import React from "react";
import "./Table.css";
import { Pokemon } from "../../types/pokemons";

interface TableProps {
  data: Pokemon[];
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, handleEdit, handleDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Ataque</th>
          <th>Defensa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((pokemon, index) => (
          <tr key={index}>
            <td>{pokemon.name}</td>
            <td className="image-cell">
              <img src={pokemon.image} alt={pokemon.name} />
            </td>
            <td>{pokemon.attack}</td>
            <td>{pokemon.defense}</td>
            <td className="actions-cell">
              <button
                className="edit-button"
                onClick={() => handleEdit?.(pokemon.id)}
              >
                &#9998;
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete?.(pokemon.id)}
              >
                &#128465;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

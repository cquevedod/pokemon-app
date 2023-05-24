import React from "react";
import "./SearchInput.css";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (enteredString: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  disabled,
  value,
  ...props
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredString = event.target.value;
    onSearch?.(enteredString);
  };

  return (
    <div className="search-input">
      <span className="search-icon">&#128269;</span>
      <input
        value={disabled ? "" : value}
        type="text"
        placeholder="Buscar"
        onChange={handleSearch}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default SearchInput;

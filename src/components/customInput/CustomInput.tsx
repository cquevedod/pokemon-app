import React from "react";
import "./CustomInput.css";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (value: string) => void;
  label?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  handleChange,
  label,
  ...props
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleChange(value);
  };

  return (
    <div className="input-container">
      {label && <p className="input-label">{label}</p>}
      <input className="custom-input" onChange={onChange} {...props} />
    </div>
  );
};

export default CustomInput;

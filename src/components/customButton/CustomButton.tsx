import React from "react";
import "./CustomButton.css";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon?: string;
  label?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  icon,
  label,
  ...props
}) => {
  return (
    <button className="button" onClick={onClick} {...props}>
      {icon && <span className={`icon-${icon}`} />}
      {label && <span className="label">{label}</span>}
    </button>
  );
};

export default CustomButton;

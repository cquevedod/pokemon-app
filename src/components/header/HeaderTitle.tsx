import React, { ButtonHTMLAttributes } from "react";
import "./HeaderTitle.css";

interface HeaderTitleProps {
  label: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ label, ...props }) => {
  return (
    <div className="header-title" {...props}>
      {label}
    </div>
  );
};

export default HeaderTitle;

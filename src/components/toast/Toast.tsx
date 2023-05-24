import React from "react";
import "./Toast.css";

export const TOAST_LAPSE = 5000;

const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => (
  <div className="toast">
    <span>{message}</span>
    <button onClick={onClose}>&times;</button>
  </div>
);

export default Toast;

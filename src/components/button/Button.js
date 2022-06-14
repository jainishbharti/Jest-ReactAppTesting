import React, { useState } from "react";
import "./button.css";

export const Button = () => {
  const [showAnotherButton, setShowAnotherButton] = useState(false);
  return (
    <div>
      <button
        data-testid="button"
        className="button-style"
        onClick={() => {
          setShowAnotherButton(true);
        }}
      >
        CLICK HERE
      </button>
      {showAnotherButton && (
        <button data-testid="button" className="button-style">
          CLICK HERE
        </button>
      )}
    </div>
  );
};

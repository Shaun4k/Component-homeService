import React from "react";
import "../../styles/SmallBox.css";

const SmallBox = ({ color, children }) => {
  return (
    <div className="small-box" style={{ backgroundColor: color }}>
      <div className="small-box-content">{children}</div>
    </div>
  );
};

export default SmallBox; 
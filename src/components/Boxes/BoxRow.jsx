import React from "react";
import "../../styles/BoxRow.css";

const BoxRow = ({ gap = "16px", children }) => {
  return (
    <div className="box-row" style={{ gap }}>
      {children}
    </div>
  );
};

export default BoxRow; 
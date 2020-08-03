import React from "react";
import "./genre.css";
export const Genre = ({ title, color }) => (
  <span
    style={{
      backgroundColor: color,
    }}
    className="genre"
  >
    <span
      style={{
        color,
        filter: "brightness(50%)",
      }}
      className="genre"
    >
      {title}
    </span>
  </span>
);

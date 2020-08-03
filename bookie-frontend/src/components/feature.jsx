import React from "react";
import "./feature.css";

export const Feature = (image, title) => (
  <div className="feature">
    <div
      className="image"
      style={{
        background: "red",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <p className="text-primary">{title}</p>
  </div>
);

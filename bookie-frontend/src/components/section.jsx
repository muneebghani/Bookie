import React from "react";
import "./section.css";

export const Section = ({ children, classes }) => {
  return <section className={`section ${classes}`}>{children}</section>;
};

import React from "react";
import { Library, Discover } from "../util/links";
import { NavLink } from "react-router-dom";
import { Layout } from 'antd';
import "./sidebar.css";

const SidebarTab = ({ title, links = [] }) => (
  <div className="sidebar-section">
    <p className="title primary-faded">{title}</p>
    {links.map(({ path, title, icon }) => (
      <NavLink
        exact
        activeClassName="active"
        className="sidebar-link"
        to={path}
      >
        <div className="icon">{icon}</div>
        <p className="text-primary">{title}</p>
      </NavLink>
    ))}
  </div>
);

export const Sidebar = () => (
  <Layout>
  <div className="sidebar">
    <SidebarTab {...Discover} />
    <SidebarTab {...Library} />
  </div>
  </Layout>
);

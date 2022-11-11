import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

type ItemProps = {
  iconName: string;
  title: string;
  to: string;
  onClick?(e: any): void;
};

function SidebarItem(props: ItemProps) {
  const { iconName, title, to, onClick } = props;
  return (
    <NavLink className="app-sidebar-item" to={to} onClick={onClick}>
      <div className="app-sidebar-item-icon">
        <i className={`bi bi-${iconName}`}></i>
      </div>
      <span className="app-sidebar-item-title">{title}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { signOut } = useAuth();

  function toggleSidebar(e: any) {
    e.preventDefault();
    setExpanded(!expanded);
  }

  function handleSignout(e: any) {
    e.preventDefault();
    signOut();
  }

  return (
    <div id="app-sidebar-wrapper">
      <div id="app-sidebar" className={classNames({ expanded })}>
        <a id="app-sidebar-toggle" href="/" onClick={toggleSidebar}>
          {expanded ? (
            <i className="bi bi-arrow-left-short"></i>
          ) : (
            <i className="bi bi-arrow-right-short"></i>
          )}
        </a>
        <SidebarItem iconName="house-door" title="Dashboard" to="/" />
        <SidebarItem iconName="bank" title="Contas" to="/contas" />
        <SidebarItem
          iconName="list-check"
          title="Transações"
          to="/transacoes"
        />
        <SidebarItem
          iconName="box-arrow-right"
          title="Sair"
          to="/sair"
          onClick={handleSignout}
        />
      </div>
    </div>
  );
}

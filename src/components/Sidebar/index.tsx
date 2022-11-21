import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import { Dropdown } from "react-bootstrap";

type ItemProps = {
  iconName: string;
  title: string;
  to: string;
  onClick?(e: any): void;
};

type Props = {
  onAddExpense(): void;
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

export default function Sidebar(props: Props) {
  const { onAddExpense } = props;
  const [expanded, setExpanded] = useState(false);
  const { signOut } = useAuth();

  function toggleSidebar(e: any) {
    e.preventDefault();
    setExpanded(!expanded);
  }

  function handleAddExpense(e: any) {
    e.preventDefault();
    onAddExpense();
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
        <Dropdown>
          <Dropdown.Toggle as="div" id="dropdown-add">
            <div className="app-sidebar-item app-sidebar-item-add">
              <div className="app-sidebar-item-icon">
                <i className="bi bi-plus"></i>
              </div>
              <span className="app-sidebar-item-title">Adicionar</span>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/" onClick={handleAddExpense}>
              <i className="bi bi-graph-down me-1"></i>
              <span>Despesa</span>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <i className="bi bi-graph-up me-1"></i>
              <span>Receita</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <SidebarItem iconName="house-door" title="Dashboard" to="/" />
        <SidebarItem iconName="bank" title="Contas" to="/contas" />
        <SidebarItem
          iconName="credit-card"
          title="Cartões de crédito"
          to="/cartoes-de-credito"
        />
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

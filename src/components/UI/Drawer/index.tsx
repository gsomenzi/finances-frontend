import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

const ESCAPE_KEY = 27;

type Props = {
  title?: string;
  open: boolean;
  onClose: Function;
  children?: ReactNode;
  FooterComponent?: ReactNode;
};

export default function Drawer(props: Props) {
  const { title, children, open, onClose, FooterComponent } = props;
  const [expanded, setExpanded] = useState(false);

  function handleClose(e?: any) {
    if (e) {
      e.preventDefault();
    }
    onClose();
  }

  function toggleExpanded(e: any) {
    e.preventDefault();
    setExpanded(!expanded);
  }

  const handleKeyDown = (event: any) => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        return handleClose();
      default:
        return;
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

  return (
    <div className={classNames("ui-drawer", { open })}>
      <div className="ui-drawer-overlay" onClick={handleClose}></div>
      <div className={classNames("ui-drawer-container", { expanded })}>
        <a id="ui-drawer-expanded-toggle" href="/" onClick={toggleExpanded}>
          {expanded ? (
            <i className="bi bi-arrow-right-short"></i>
          ) : (
            <i className="bi bi-arrow-left-short"></i>
          )}
        </a>
        <div className="ui-drawer-header px-3 mb-2">
          <h3 className="mb-0">{title}</h3>
          <a href="/" className="ui-drawer-close-btn" onClick={handleClose}>
            <i className="bi bi-x"></i>
          </a>
        </div>
        <div className="ui-drawer-body px-3">{children}</div>
        <div className="ui-drawer-footer px-3 py-3">{FooterComponent}</div>
      </div>
    </div>
  );
}

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  title?: string;
  open: boolean;
  onClose: Function;
  children?: ReactNode;
};

export default function Drawer(props: Props) {
  const { title, children, open, onClose } = props;
  const [expanded, setExpanded] = useState(false);

  function handleClose(e?: any) {
    if (e) {
      e.preventDefault();
    }
    onClose();
  }

  const _handleKeyDown = (event: any) => {
    switch (event.keyCode) {
      case 27:
        handleClose();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", _handleKeyDown);
    } else {
      document.removeEventListener("keydown", _handleKeyDown);
    }
  }, [open]);

  return (
    <div className={classNames("ui-drawer", { open })}>
      <div className="ui-drawer-overlay" onClick={handleClose}></div>
      <div className={classNames("ui-drawer-container", { expanded })}>
        <div className="ui-drawer-header px-3 mb-2">
          <h3 className="mb-0">{title}</h3>
          <a href="/" className="ui-drawer-close-btn" onClick={handleClose}>
            <i className="bi bi-x"></i>
          </a>
        </div>
        <div className="px-3">{children}</div>
      </div>
    </div>
  );
}

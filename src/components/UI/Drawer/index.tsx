import React, { ReactNode, useState } from "react";
import classNames from "classnames";

type Props = {
  children?: ReactNode;
};

export default function Drawer(props: Props) {
  const { children } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="ui-drawer">
      <div className="ui-drawer-overlay"></div>
      <div className={classNames("ui-drawer-container", { expanded })}>
        {children}
      </div>
    </div>
  );
}

import Drawer from "components/UI/Drawer";
import React, { useState } from "react";
import Button from "components/UI/Button";

export default function HomeView() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir</Button>
      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

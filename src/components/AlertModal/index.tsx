import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  title: string;
  description: string;
};

export default function AlertModal(props: Props) {
  const { title, description } = props;
  const [show, setShow] = useState();

  function handleClose() {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

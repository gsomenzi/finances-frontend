import React from "react";
import {
  Button as BootstrapButton,
  ButtonProps,
  Spinner,
} from "react-bootstrap";

interface Props extends ButtonProps {
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: Props) {
  return (
    <BootstrapButton disabled={loading || props.disabled} {...props}>
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      ) : null}
      {children}
    </BootstrapButton>
  );
}

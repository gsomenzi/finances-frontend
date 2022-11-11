import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "providers/AccountsProvider";

const options = [
  { value: "checking", label: "Conta corrente" },
  { value: "investiment", label: "Investimento" },
  { value: "other", label: "Outro" },
];

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Por favor informe um nome para a conta"),
  type: Yup.string().oneOf(
    ["checking", "investiment", "other"],
    "Por favor selecione um tipo válido"
  ),
  opening_balance: Yup.number().required("Por favor informe um saldo inicial"),
});

type Props = {
  show: boolean;
  setShow: any;
};

export default function AddAccountModal(props: Props) {
  const { show, setShow } = props;
  const { create, loading } = useAccounts();
  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      description: "",
      type: "checking",
      opening_balance: 0.0,
    },
    onSubmit: async (values) => {
      await create(values);
      setShow(false);
    },
    validationSchema,
  });

  useEffect(() => {
    resetForm();
  }, [show]);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nova conta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="description"
              value={values.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Saldo inicial</Form.Label>
            <Form.Control
              name="opening_balance"
              value={values.opening_balance}
              onChange={handleChange}
              isInvalid={!!errors.opening_balance}
              type="number"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Select
              defaultValue={{ value: "checking", label: "Conta corrente" }}
              options={options}
              onChange={(selected) => setFieldValue("type", selected?.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.type}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancelar
        </Button>
        <Button
          onClick={() => handleSubmit()}
          disabled={loading}
          variant="primary"
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select, { StylesConfig } from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "providers/AccountsProvider";
import Drawer from "components/UI/Drawer";

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
  default: Yup.boolean(),
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
      default: false,
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
    <Drawer
      title="Nova conta"
      open={show}
      onClose={() => setShow(false)}
      FooterComponent={
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={loading}
            variant="primary"
            className="ms-2"
          >
            Adicionar
          </Button>
        </div>
      }
    >
      <Form>
        <Form.Group className="form-group">
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
        <Form.Group className="form-group">
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
        <Form.Group className="form-group">
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
        <Form.Group className="form-group" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="default"
            label="Default"
            checked={values.default}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Drawer>
  );
}

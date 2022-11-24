import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "providers/AccountsProvider";
import Drawer from "components/UI/Drawer";
import { Account } from "types/Account";
import { normalizePrice } from "tools";
import currencyList from "tools/currencyList";

const options: OptionProp[] = [
  { value: "checking", label: "Conta corrente" },
  { value: "investiment", label: "Investimento" },
  { value: "other", label: "Outro" },
];

const currencyOpts: OptionProp[] = currencyList.map(c => ({value: c.code, label: c.name}))

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
  account?: Account | null;
};

type OptionProp = {
  value: string;
  label: string;
};

export default function AddAccountModal(props: Props) {
  const { show, setShow, account } = props;
  const { create, update, loading } = useAccounts();
  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      description: "",
      type: "checking",
      currency: "BRL",
      default: false,
      opening_balance: 0.0,
    },
    onSubmit: async (values) => {
      if (account) {
        await update(account.id, values);
      } else {
        await create(values);
      }
      setShow(false);
    },
    validationSchema,
  });

  useEffect(() => {
    if (account) {
      setValues({
        description: account.description,
        type: account.type,
        currency: account.currency,
        default: account.default,
        opening_balance: normalizePrice(account.opening_balance),
      });
    } else {
      resetForm();
    }
  }, [account]);

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
            Salvar
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
            defaultValue={
              account
                ? options.find((o) => o.value === account.type)
                : options[0]
            }
            options={options}
            onChange={(selected) => setFieldValue("type", selected?.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.type}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Moeda</Form.Label>
          <Select
            defaultValue={
              account
                ? currencyOpts.find((o) => o.value === account.currency)
                : currencyOpts.find((o) => o.value === 'BRL')
            }
            options={currencyOpts}
            onChange={(selected) => setFieldValue("currency", selected?.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.type}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            name="default"
            label="Conta padrão"
            checked={values.default}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Drawer>
  );
}

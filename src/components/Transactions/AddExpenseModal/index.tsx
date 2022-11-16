import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "providers/AccountsProvider";
import { Account } from "types/Account";
import { useCategory } from "providers/CategoryProvider";

const options = [
  { value: "checking", label: "Conta corrente" },
  { value: "investiment", label: "Investimento" },
  { value: "other", label: "Outro" },
];

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Por favor informe um nome para a conta"),
  value: Yup.number()
    .required("Por favor informe um valor")
    .positive("Por favor informe um valor positivo"),
  type: Yup.string().oneOf(["expense"], "Por favor selecione um tipo válido"),
  date: Yup.string().required("Por favor informe uma data"),
  financial_account_id: Yup.string().required("Por favor selecione uma conta"),
  category_id: Yup.string().required("Por favor selecione uma categoria"),
});

type Props = {
  show: boolean;
  setShow: any;
};

export default function AddExpenseModal(props: Props) {
  const { show, setShow } = props;
  const {
    create,
    getAll: getAccounts,
    accounts,
    loading: loadingAccounts,
  } = useAccounts();
  const {
    getAll: getCategories,
    categories,
    loading: loadingCategories,
  } = useCategory();
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
      value: 0.0,
      type: "expense",
      date: "",
      financial_account_id: "",
      category_id: "",
    },
    onSubmit: async (values) => {
      await create(values);
      setShow(false);
    },
    validationSchema,
  });

  const loadAccounts = (inputValue: string) =>
    new Promise<Account[]>((resolve) => {
      resolve(
        accounts.filter(
          (a) =>
            a.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        )
      );
    });

  const loadCategories = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      resolve(
        categories.filter(
          (a) =>
            a.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        )
      );
    });

  useEffect(() => {
    resetForm();

    if (show) {
      getAccounts();
      getCategories();
    }
  }, [show]);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nova despesa</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
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
            <Form.Label>Valor</Form.Label>
            <Form.Control
              name="value"
              value={values.value}
              onChange={handleChange}
              isInvalid={!!errors.value}
              type="number"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.value}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data</Form.Label>
            <Form.Control
              name="date"
              value={values.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
              type="date"
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Conta</Form.Label>
            <AsyncSelect
              defaultOptions={accounts}
              loadOptions={loadAccounts}
              cacheOptions
              onChange={(selected) =>
                setFieldValue("financial_account_id", selected?.id)
              }
              getOptionLabel={(o) => o.description}
              getOptionValue={(o) => `${o.id}`}
            />
            <Form.Control.Feedback type="invalid">
              {errors.financial_account_id}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoria</Form.Label>
            <AsyncSelect
              defaultOptions={categories}
              loadOptions={loadCategories}
              cacheOptions
              onChange={(selected) =>
                setFieldValue("category_id", selected?.id)
              }
              getOptionLabel={(o) => o.description}
              getOptionValue={(o) => `${o.id}`}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category_id}
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
          disabled={loadingAccounts || loadingCategories}
          variant="primary"
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

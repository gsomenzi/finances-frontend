import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../providers/AuthProvider";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Por favor informe o seu e-mail")
    .email("Por favor informe um e-mail válido"),
  password: Yup.string().required("Por favor informe a sua senha"),
});

export default function LoginView() {
  const { loading, authenticate } = useAuth();
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      authenticate(email, password);
    },
    validationSchema,
  });

  return (
    <div>
      <Form>
        <FormGroup>
          <FormLabel>E-mail</FormLabel>
          <FormControl
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <FormControl.Feedback type="invalid">
            {errors.email}
          </FormControl.Feedback>
        </FormGroup>
        <FormGroup className="mt-1">
          <FormLabel>Senha</FormLabel>
          <FormControl
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <FormControl.Feedback type="invalid">
            {errors.password}
          </FormControl.Feedback>
        </FormGroup>
        <Button
          onClick={() => handleSubmit()}
          className="mt-3 w-100"
          disabled={loading}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

import { Box, Button, Container, LinearProgress, Paper, Stack, TextField, Typography, Link } from '@mui/material';
import React from 'react';
import { Content } from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthProvider';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Por favor informe seu nome'),
    email: Yup.string().required('Por favor informe seu e-mail'),
    password: Yup.string().required('Por favor informe sua senha'),
});

export default function RegisterView() {
    const { authenticating } = useAuth();
    const { values, errors, touched, handleChange, handleBlur } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => console.log(values),
    });
    return (
        <Container maxWidth="sm">
            <Paper elevation={1} style={{ overflow: 'hidden' }}>
                {authenticating ? <LinearProgress /> : null}
                <Content>
                    <Typography textAlign="left" variant="h4" paddingBottom={2}>
                        Cadastro
                    </Typography>
                    <Box width="100%" component="form" noValidate autoComplete="off">
                        <Stack spacing={2}>
                            <TextField
                                error={Boolean(touched.name && errors.name)}
                                id="name"
                                label="Nome"
                                value={values.name}
                                helperText={(touched.name && errors.name) || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                id="email"
                                label="E-mail"
                                value={values.email}
                                helperText={(touched.email && errors.email) || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                            <TextField
                                error={Boolean(touched.password && errors.password)}
                                type="password"
                                id="password"
                                label="Senha"
                                value={values.password}
                                helperText={(touched.password && errors.password) || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                            <Button disabled={authenticating} variant="contained" size="large" fullWidth>
                                Salvar
                            </Button>
                            <Link component={RouterLink} to="/">
                                <Typography textAlign="left">Já possui usuário? Faça login!</Typography>
                            </Link>
                        </Stack>
                    </Box>
                </Content>
            </Paper>
        </Container>
    );
}

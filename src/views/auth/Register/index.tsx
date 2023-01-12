import React from 'react';
import { Box, Button, Container, LinearProgress, Paper, Stack, TextField, Typography, Link, Grid } from '@mui/material';
import { Content } from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import UserService from 'services/UserService';
import { UserRegistrationData } from 'types/UserRegistrationData';
import FloatingError from 'components/FloatingError';
import { useAuth } from 'providers/AuthProvider';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Por favor informe seu nome'),
    email: Yup.string().required('Por favor informe seu e-mail'),
    password: Yup.string().required('Por favor informe sua senha'),
});

export default function RegisterView() {
    const { persistAuthData } = useAuth();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit: async values => {
            mutate(values as UserRegistrationData);
        },
    });
    const { isLoading, isError, error, reset, mutate } = useMutation(UserService.register, {
        onSuccess: (data: any) => {
            const { auth_data } = data;
            persistAuthData(auth_data);
        },
    });

    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={1} style={{ overflow: 'hidden' }}>
                    {isLoading ? <LinearProgress /> : null}
                    <Content>
                        <Typography textAlign="left" variant="h4" paddingBottom={2}>
                            Cadastro
                        </Typography>
                        <Box width="100%" component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                <Grid container>
                                    <Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={Boolean(
                                                touched.password_confirmation && errors.password_confirmation,
                                            )}
                                            type="password"
                                            id="password_confirmation"
                                            label="Confirmação"
                                            value={values.password_confirmation}
                                            helperText={
                                                (touched.password_confirmation && errors.password_confirmation) || ''
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Button disabled={isLoading} variant="contained" size="large" fullWidth type="submit">
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
            <FloatingError open={isError} onClose={reset} title="Falha ao cadastrar usuário" error={error} />
        </>
    );
}

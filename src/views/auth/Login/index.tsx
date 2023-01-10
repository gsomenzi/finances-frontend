import {
    Box,
    Button,
    Container,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Typography,
    Link,
    Snackbar,
    Alert,
    AlertTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { Content } from './styles';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'providers/AuthProvider';
import { AppError } from 'types/AppError';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Por favor informe seu e-mail'),
    password: Yup.string().required('Por favor informe sua senha'),
});

export default function LoginView() {
    const [error, setError] = useState<AppError | null>(null);
    const { authenticating, authenticate } = useAuth();
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async values => {
            try {
                const { email, password } = values;
                await authenticate(email, password);
            } catch (e: any) {
                setError(e);
            }
        },
    });
    return (
        <>
            <Container maxWidth="sm">
                <Paper elevation={1} style={{ overflow: 'hidden' }}>
                    {authenticating ? <LinearProgress /> : null}
                    <Content>
                        <Typography textAlign="left" variant="h4" paddingBottom={2}>
                            Login
                        </Typography>
                        <Box width="100%" component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
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
                                <Box>
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
                                    <Link component={RouterLink} to="/cadastro">
                                        <Typography textAlign="left">Esqueci minha senha</Typography>
                                    </Link>
                                </Box>
                                <Button
                                    type="submit"
                                    disabled={authenticating}
                                    variant="contained"
                                    size="large"
                                    fullWidth>
                                    Login
                                </Button>
                                <Link component={RouterLink} to="/cadastro">
                                    <Typography textAlign="left">Não possui usuário? Cadastre-se!</Typography>
                                </Link>
                            </Stack>
                        </Box>
                    </Content>
                </Paper>
            </Container>
            <Snackbar
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}>
                <Alert variant="filled" onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle>Falha ao efetuar login</AlertTitle>
                    {error?.fields
                        ? Object.values(error.fields).map((v, i) => (
                              <Typography key={i} marginBottom={0}>
                                  {v}
                              </Typography>
                          ))
                        : null}
                </Alert>
            </Snackbar>
        </>
    );
}

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    FormHelperText,
} from '@mui/material';

export default function AccountsForm() {
    const { values, touched, handleChange, handleBlur, errors } = useFormik({
        initialValues: {
            description: '',
            opening_balance: 0,
        },
        onSubmit: values => console.log(values),
    });

    return (
        <Box component="form" paddingY="2">
            <Stack spacing={2}>
                <TextField
                    error={Boolean(touched.description && errors.description)}
                    id="description"
                    label="Nome da conta"
                    value={values.description}
                    helperText={(touched.description && errors.description) || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <FormControl>
                    <FormLabel id="account-type-label">Tipo</FormLabel>
                    <RadioGroup row aria-labelledby="account-type-label" defaultValue="checking" name="type">
                        <FormControlLabel value="checking" control={<Radio />} label="Conta corrente" />
                        <FormControlLabel value="investiment" control={<Radio />} label="Investimento" />
                        <FormControlLabel value="other" control={<Radio />} label="Outros" />
                    </RadioGroup>
                </FormControl>
                <FormControl
                    fullWidth
                    variant="outlined"
                    error={Boolean(touched.opening_balance && errors.opening_balance)}>
                    <InputLabel htmlFor="opening_balance">Saldo inicial</InputLabel>
                    <OutlinedInput
                        id="opening_balance"
                        type="number"
                        value={values.opening_balance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Saldo inicial"
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        {(touched.opening_balance && errors.opening_balance) || ''}
                    </FormHelperText>
                </FormControl>
            </Stack>
        </Box>
    );
}

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    InputLabel,
    FormHelperText,
    Autocomplete,
} from '@mui/material';
import { getCurrenciesAsArray, getCurrencyData } from 'tools/currencyList';
import AppDrawer, { AppDrawerProps } from 'components/AppDrawer';
import { Account } from 'types/Account';
import { normalizeValue } from 'tools';
import { useMutation, useQueryClient } from 'react-query';
import AccountService from 'services/AccountService';
import FloatingError from 'components/FloatingError';
import { AppError } from 'types/AppError';
import CurrencyInput from 'components/CurrencyInput';
const validationSchema = Yup.object().shape({
    description: Yup.string().required('Você deve informar um nome'),
    type: Yup.string().required('Você deve selecionar um tipo'),
    opening_balance: Yup.string().required('Você deve informar um valor'),
    currency: Yup.string().required('Você deve selecionar uma moeda'),
});
const currencies = getCurrenciesAsArray();

interface FormProps extends Omit<AppDrawerProps, 'children'> {
    account?: Account | null;
}

export default function AccountsForm({ account, onClose, ...props }: FormProps) {
    const queryClient = useQueryClient();
    const [pageError, setPageError] = useState<AppError | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState(getCurrencyData('BRL'));
    const { mutate: create, isLoading: creating } = useMutation(AccountService.create, {
        onSuccess: handleSuccess,
        onError: (e: any) => setPageError(e),
    });
    const { mutate: update, isLoading: updating } = useMutation(AccountService.update, {
        onSuccess: handleSuccess,
        onError: (e: any) => setPageError(e),
    });
    const { values, touched, handleChange, handleBlur, setFieldValue, resetForm, setValues, handleSubmit, errors } =
        useFormik({
            initialValues: {
                description: '',
                type: 'checking',
                opening_balance: '',
                currency: 'BRL',
            },
            validationSchema,
            onSubmit: values => {
                if (account) {
                    update({
                        ...values,
                        opening_balance: String(normalizeValue(values.opening_balance)),
                        id: account.id,
                    });
                } else {
                    create({ ...values, opening_balance: String(normalizeValue(values.opening_balance)) });
                }
            },
        });

    useEffect(() => {
        setFieldValue('currency', selectedCurrency?.code || '');
    }, [selectedCurrency]);

    useEffect(() => {
        if (account) {
            setValues({
                description: account.description,
                type: account.type,
                opening_balance: account.opening_balance,
                currency: account.currency,
            });
            setSelectedCurrency(getCurrencyData(account.currency));
        } else {
            resetForm();
        }
    }, [account]);

    function handleSuccess() {
        onClose();
        queryClient.invalidateQueries('accounts');
    }

    return (
        <>
            <AppDrawer
                title="Nova conta"
                onClose={onClose}
                isLoading={creating || updating}
                onSubmit={handleSubmit}
                {...props}>
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
                        <RadioGroup
                            row
                            aria-labelledby="account-type-label"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="type">
                            <FormControlLabel value="checking" control={<Radio />} label="Conta corrente" />
                            <FormControlLabel value="investiment" control={<Radio />} label="Investimento" />
                            <FormControlLabel value="other" control={<Radio />} label="Outros" />
                        </RadioGroup>
                    </FormControl>
                    <Autocomplete
                        id="currency-select"
                        options={currencies}
                        getOptionLabel={c => `${c.name} (${c.code})`}
                        fullWidth
                        renderInput={params => <TextField {...params} fullWidth label="Moeda" />}
                        onChange={(e, v) => setSelectedCurrency(v)}
                        value={selectedCurrency}
                    />
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(touched.opening_balance && errors.opening_balance)}>
                        <InputLabel htmlFor="opening_balance">Saldo inicial</InputLabel>
                        <CurrencyInput
                            label="Saldo inicial"
                            name="opening_balance"
                            value={values.opening_balance}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            currencySymbol={selectedCurrency?.symbol || ''}
                        />
                        <FormHelperText id="outlined-weight-helper-text">
                            {(touched.opening_balance && errors.opening_balance) || ''}
                        </FormHelperText>
                    </FormControl>
                </Stack>
            </AppDrawer>
            <FloatingError
                open={!!pageError}
                onClose={() => setPageError(null)}
                title="Falha ao adicionar ou atualizar conta"
                error={pageError}
            />
        </>
    );
}

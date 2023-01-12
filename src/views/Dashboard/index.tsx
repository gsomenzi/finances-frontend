import {
    Box,
    Button,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Page } from 'components/Page';
import { useAuth } from 'providers/AuthProvider';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import AccountService from 'services/AccountService';
import { normalizeValue } from 'tools';

export default function DashboardView() {
    const { signOut } = useAuth();
    const { data, isLoading, error } = useQuery('accounts', AccountService.getAll);

    return (
        <Page HeaderComponent={isLoading ? <LinearProgress color="secondary" /> : null}>
            <Box display="flex" alignItems="center" marginBottom={2}>
                <Typography flexGrow="1" variant="h3">
                    Contas
                </Typography>
                <Box>
                    <Button variant="contained">Adicionar</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Conta</TableCell>
                            <TableCell>Saldo atual</TableCell>
                            <TableCell>Saldo previsto</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data
                            ? data.data.map((account, i) => (
                                  <TableRow key={account.id}>
                                      <TableCell>{i + 1}</TableCell>
                                      <TableCell>{account.description}</TableCell>
                                      <TableCell>{normalizeValue(account.converted_balance)}</TableCell>
                                      <TableCell>{normalizeValue(account.converted_expected_balance)}</TableCell>
                                      <TableCell></TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Page>
    );
}

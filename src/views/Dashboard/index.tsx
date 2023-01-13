import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    ButtonGroup,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import AccountsForm from 'components/accounts/AccountsForm';
import AppDrawer from 'components/AppDrawer';
import ConfirmDialog from 'components/ConfirmDialog';
import FloatingError from 'components/FloatingError';
import { Page } from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AccountService from 'services/AccountService';
import { getCurrencyString } from 'tools';
import { Account } from 'types/Account';
import { AppError } from 'types/AppError';

export default function DashboardView() {
    const [pageError, setPageError] = useState<AppError | null>(null);
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const { data, isLoading, error } = useQuery('accounts', AccountService.getAll);
    const queryClient = useQueryClient();
    const removeMutation = useMutation(AccountService.remove);

    useEffect(() => {
        if (error) {
            setPageError(error as AppError);
        } else {
            setPageError(null);
        }
    }, [error]);

    function selectForRemove(account: Account) {
        setSelectedAccount(account);
        setShowRemoveDialog(true);
    }

    function removeAccount() {
        if (selectedAccount) {
            removeMutation.mutate(selectedAccount.id, {
                onSuccess: () => queryClient.invalidateQueries('accounts'),
                onError: e => setPageError(e as AppError),
            });
        }
        setShowRemoveDialog(false);
    }

    return (
        <>
            <Page HeaderComponent={isLoading ? <LinearProgress color="secondary" /> : null}>
                <Box marginBottom={2}>
                    <Box display="flex" alignItems="center">
                        <Typography flexGrow="1" variant="h3">
                            Contas
                        </Typography>
                        <Box>
                            <Button variant="contained" onClick={() => setOpenDrawer(true)}>
                                Adicionar
                            </Button>
                        </Box>
                    </Box>
                    <TextField id="outlined-basic" label="Pesquisar" variant="standard" />
                </Box>
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Conta</TableCell>
                                <TableCell>Saldo atual</TableCell>
                                <TableCell>Saldo previsto</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data
                                ? data.data.map((account, i) => (
                                      <TableRow key={account.id}>
                                          <TableCell>{i + 1}</TableCell>
                                          <TableCell>{account.description}</TableCell>
                                          <TableCell>{getCurrencyString(account.converted_balance)}</TableCell>
                                          <TableCell>{getCurrencyString(account.converted_expected_balance)}</TableCell>
                                          <TableCell align="right">
                                              <ButtonGroup variant="text">
                                                  <Button>
                                                      <EditOutlined />
                                                  </Button>
                                                  <Button color="error" onClick={() => selectForRemove(account)}>
                                                      <DeleteOutline />
                                                  </Button>
                                              </ButtonGroup>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Page>
            <AppDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} title="Nova conta">
                <AccountsForm />
            </AppDrawer>
            <ConfirmDialog
                title="Você deseja remover?"
                description="Você realmente deseja remover esta conta?"
                open={showRemoveDialog}
                onClose={() => setShowRemoveDialog(false)}
                handleConfirm={removeAccount}
            />
            <FloatingError
                open={!!pageError}
                onClose={() => setPageError(null)}
                title="Falha ao buscar contas"
                error={pageError}
            />
        </>
    );
}

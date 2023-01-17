import React, { useEffect, useState } from 'react';
import { DeleteOutline, EditOutlined, StarOutline } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    FormControlLabel,
    FormGroup,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import AccountsForm from 'components/accounts/AccountsForm';
import ConfirmDialog from 'components/ConfirmDialog';
import FloatingError from 'components/FloatingError';
import { Page } from 'components/Page';
import PageHeader from 'components/PageHeader';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AccountService from 'services/AccountService';
import { getCurrencyString, getTranslatedAccountType, normalizeValue } from 'tools';
import { Account } from 'types/Account';
import { AppError } from 'types/AppError';

export default function AccountsList() {
    const [pageError, setPageError] = useState<AppError | null>(null);
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [convertBalance, setConvertBalance] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalBalances, setTotalBalances] = useState<{ [key: string]: number }>({});
    const [totalExpectedBalances, setTotalExpectedBalances] = useState<{ [key: string]: number }>({});
    const { data, isLoading, error } = useQuery({
        queryKey: ['accounts', { q: searchTerm }],
        queryFn: AccountService.getAll,
    });
    const queryClient = useQueryClient();
    const removeMutation = useMutation(AccountService.remove);
    const favoriteMutation = useMutation(AccountService.update);

    useEffect(() => {
        if (data?.data) {
            const tmpTotalBalances: { [key: string]: number } = {};
            const tmpTotalExpectedBalances: { [key: string]: number } = {};
            data.data.map(entry => {
                if (!tmpTotalBalances[entry.currency]) {
                    tmpTotalBalances[entry.currency] = normalizeValue(entry.current_balance);
                } else {
                    tmpTotalBalances[entry.currency] += normalizeValue(entry.current_balance);
                }
                if (!tmpTotalExpectedBalances[entry.currency]) {
                    tmpTotalExpectedBalances[entry.currency] = normalizeValue(entry.expected_balance);
                } else {
                    tmpTotalExpectedBalances[entry.currency] += normalizeValue(entry.expected_balance);
                }
            });
            setTotalBalances(tmpTotalBalances);
            setTotalExpectedBalances(tmpTotalExpectedBalances);
        } else {
            setTotalBalances({});
            setTotalExpectedBalances({});
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setPageError(error as AppError);
        } else {
            setPageError(null);
        }
    }, [error]);

    function handleAdd() {
        setSelectedAccount(null);
        setOpenDrawer(true);
    }

    function favoriteAccount(account: Account) {
        favoriteMutation.mutate(
            { ...account, default: true },
            {
                onSuccess: () => queryClient.invalidateQueries('accounts'),
            },
        );
    }

    function selectForEdit(account: Account) {
        setSelectedAccount(account);
        setOpenDrawer(true);
    }

    function selectForRemove(account: Account) {
        setSelectedAccount(account);
        setShowRemoveDialog(true);
    }

    function removeAccount() {
        if (selectedAccount) {
            removeMutation.mutate(selectedAccount.id, {
                onSuccess: () => queryClient.invalidateQueries('accounts'),
                onError: e => setPageError(e as AppError),
                onSettled: () => setSelectedAccount(null),
            });
        }
        setShowRemoveDialog(false);
    }

    return (
        <>
            <Page isLoading={isLoading}>
                <PageHeader
                    title="Contas"
                    primaryBtn={{
                        title: 'Adicionar',
                        onClick: handleAdd,
                    }}
                    onSearch={setSearchTerm}
                    secondaryContent={
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        defaultChecked={convertBalance}
                                        onChange={() => setConvertBalance(!convertBalance)}
                                    />
                                }
                                label="Conveter saldos"
                            />
                        </FormGroup>
                    }
                />
                <TableContainer>
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
                                          <TableCell>
                                              <Typography fontWeight="bold" marginBottom={0}>
                                                  {account.description}
                                              </Typography>
                                              {getTranslatedAccountType(account.type)}
                                          </TableCell>
                                          <TableCell>
                                              {convertBalance
                                                  ? getCurrencyString(account.converted_balance)
                                                  : getCurrencyString(account.current_balance, account.currency)}
                                          </TableCell>
                                          <TableCell>
                                              {convertBalance
                                                  ? getCurrencyString(account.converted_expected_balance)
                                                  : getCurrencyString(account.expected_balance, account.currency)}
                                          </TableCell>
                                          <TableCell align="right">
                                              <ButtonGroup variant="text">
                                                  <Button
                                                      disabled={!!account.default}
                                                      onClick={() => favoriteAccount(account)}>
                                                      <StarOutline />
                                                  </Button>
                                                  <Button onClick={() => selectForEdit(account)}>
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
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell>
                                    {Object.entries(totalBalances).map(([key, value]) => (
                                        <span key={key}>{getCurrencyString(value, key)}</span>
                                    ))}
                                </TableCell>
                                <TableCell colSpan={2}>
                                    {Object.entries(totalBalances).map(([key, value]) => (
                                        <span key={key}>{getCurrencyString(value, key)}</span>
                                    ))}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Page>
            <AccountsForm open={openDrawer} onClose={() => setOpenDrawer(false)} account={selectedAccount} />
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
                title="Falha ao buscar / alterar contas"
                error={pageError}
            />
        </>
    );
}

'use client';

import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Account } from '@/types/Account';
import { AddEditFormProps } from './types';
import { Button, Checkbox, Drawer, Flex, Form, Input, Select, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import ErrorAlert from '@/components/ErrorAlert';
import AccountModel from '@/models/AccountModel';

export default function AddEditForm(props: AddEditFormProps) {
    const { account, open, onClose } = props;
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [form] = Form.useForm();
    const accountModel = new AccountModel();

    const initialBalanceTransaction = useMemo(() => {
        if (account?.relatedTransactions?.length && account.relatedTransactions.length > 0) {
            return account.relatedTransactions[0].transaction;
        } else {
            return null;
        }
    }, [account]);

    useLayoutEffect(() => {
        form.setFieldsValue({
            name: account?.name || '',
            type: account?.type || 'checkings',
            initialBalance: initialBalanceTransaction?.value || 0,
            default: account?.default || false,
        });
    }, [account, initialBalanceTransaction]);

    const addAccount = useMutation(
        (accountData) => {
            setErrorMessage(null);
            return accountModel.create(accountData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('accounts');
                queryClient.invalidateQueries('balances');
                onClose();
            },
            onError: (e: any) => {
                setErrorMessage(e?.response?.data?.message || 'Erro ao criar a conta');
            },
        },
    );

    const updateAccount = useMutation(
        (accountData: Account) => {
            setErrorMessage(null);
            return accountModel.update(accountData.id, { ...accountData });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('accounts');
                queryClient.invalidateQueries('balances');
                onClose();
            },
            onError: (e: any) => {
                setErrorMessage(e?.response?.data?.message || 'Erro ao atualizar a conta');
            },
        },
    );

    function handleCancel() {
        form.resetFields();
        onClose();
    }

    function handleSubmit(values: any) {
        const updatedValues = {
            ...values,
            initialBalance: String(values.initialBalance),
        };

        if (account?.id) {
            updateAccount.mutate({
                ...updatedValues,
                id: account.id,
            });
        } else {
            addAccount.mutate(updatedValues);
        }
    }

    return (
        <Drawer
            title={account ? 'Editar Conta' : 'Adicionar Conta'}
            open={open}
            onClose={handleCancel}
            width={600}
            footer={
                <Flex justify="end">
                    <Space>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            loading={addAccount.isLoading || updateAccount.isLoading}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { value: 'checkings', label: 'Conta Corrente' },
                            { value: 'investment', label: 'Investimento' },
                            { value: 'other', label: 'Outros' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="initialBalance" label="Saldo Inicial" rules={[{ required: true }]}>
                    <Input addonBefore="R$" type="number" />
                </Form.Item>
                <Form.Item name="default" valuePropName="checked">
                    <Checkbox defaultChecked={account?.default}>Conta padrão</Checkbox>
                </Form.Item>
                <ErrorAlert show={!!errorMessage} title="Falha ao salvar a conta" description={errorMessage} />
            </Form>
        </Drawer>
    );
}

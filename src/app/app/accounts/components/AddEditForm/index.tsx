'use client';

import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AddEditFormProps } from './types';
import { Button, Checkbox, Drawer, Flex, Form, Input, Select, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { useApi } from '@/providers/ApiProvider';
import ErrorAlert from '@/components/ErrorAlert';
import { Account } from '@/types/Account';

export default function AddEditForm(props: AddEditFormProps) {
    const { account, open, onClose } = props;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { post, put } = useApi();
    const [form] = Form.useForm();
    const addAccount = useMutation(
        (accountData) => {
            setErrorMessage(null);
            return post('/accounts', accountData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('accounts');
                onClose();
            },
            onError: () => {
                setErrorMessage('Erro ao adicionar conta');
            },
        },
    );

    const updateAccount = useMutation(
        (accountData: Account) => {
            setErrorMessage(null);
            return put(`/accounts/${accountData.id}`, { ...accountData });
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
        if (account?.id) {
            updateAccount.mutate({
                ...values,
                initialBalance: String(values.initialBalance),
                id: account.id,
            });
        } else {
            addAccount.mutate({
                ...values,
                initialBalance: String(values.initialBalance),
            });
        }
    }

    useLayoutEffect(() => {
        let initialBalance = 0;
        if (account?.relatedTransactions && account.relatedTransactions.length > 0) {
            initialBalance = Number(account.relatedTransactions[0].transaction?.value) || 0;
        }
        form.setFieldsValue({
            name: account?.name || '',
            type: account?.type || 'checkings',
            initialBalance,
            default: account?.default || false,
        });
    }, [account]);

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
                        <Button type="primary" onClick={() => form.submit()} loading={addAccount.isLoading}>
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

'use client';

import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AddEditFormProps } from './types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    Button,
    Checkbox,
    Collapse,
    CollapseProps,
    DatePicker,
    Drawer,
    Flex,
    Form,
    Input,
    Radio,
    Select,
    Space,
} from 'antd';
import dayjs from 'dayjs';
import { useFeedback } from '@/providers/FeedbackProvider';
import CreditCardTransactionModel from '@/models/CreditCardTransactionModel';
import { CreditCardTransaction } from '@/types/CreditCardTransaction';
const { TextArea } = Input;

export default function AddEditForm(props: AddEditFormProps) {
    const [form] = Form.useForm();
    const transactionModel = new CreditCardTransactionModel();
    const { statement, transaction, open, onClose } = props;
    const queryClient = useQueryClient();
    const { showMessage, showNotification } = useFeedback();

    const addTransaction = useMutation(
        (transactionData: Partial<CreditCardTransaction>) => {
            return transactionModel.create(transactionData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('statements');
                handleClose();
                showMessage('success', 'Transação criada com sucesso!');
            },
            onError: (e: any) => {
                showNotification('Erro', e?.response?.data?.message || 'Erro ao criar transação', {
                    type: 'error',
                });
            },
        },
    );

    const updateTransaction = useMutation(
        (transactionData: Partial<CreditCardTransaction> & { id: number }) => {
            return transactionModel.update(transactionData.id, { ...transactionData });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('statements');
                handleClose();
                showMessage('success', 'Transação atualizada com sucesso!');
            },
            onError: (e: any) => {
                showNotification('Erro', e?.response?.data?.message || 'Erro ao atualizar a transação', {
                    type: 'error',
                });
            },
        },
    );

    function handleClose() {
        form.resetFields();
        onClose();
    }

    function handleSubmit(values: any) {
        const updatedValues = {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
            creditCardId: statement.creditCard.id,
            installmentsCount: values.installmentsCount ? Number(values.installmentsCount) : 1,
        };

        if (transaction?.id) {
            updateTransaction.mutate({
                ...updatedValues,
                id: transaction.id,
            });
        } else {
            addTransaction.mutate(updatedValues);
        }
    }

    useLayoutEffect(() => {
        if (transaction) {
            form.setFieldsValue({
                description: transaction?.description,
                type: transaction?.type,
                value: transaction?.value,
                date: transaction?.date ? dayjs(transaction?.date) : null,
                creditCardId: statement.creditCard.id,
                notes: transaction?.notes,
            });
        } else {
            form.resetFields();
        }
    }, [transaction, statement]);

    const optionalFields: CollapseProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: 'Campos opcionais',
                children: (
                    <>
                        <Form.Item name="notes" label="Observações">
                            <TextArea rows={4} />
                        </Form.Item>
                    </>
                ),
            },
        ];
    }, [transaction]);

    return (
        <Drawer
            title={transaction ? 'Editar Transação' : 'Adicionar Transação'}
            open={open}
            onClose={handleClose}
            width={600}
            footer={
                <Flex justify="end">
                    <Space>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            loading={addTransaction.isLoading || updateTransaction.isLoading}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <Form
                initialValues={{
                    type: 'expense',
                    description: '',
                    value: '',
                    date: dayjs(),
                    paid: false,
                    installmentsCount: 1,
                    installmentsPeriod: 'month',
                }}
                form={form}
                onFinish={handleSubmit}
                layout="vertical">
                <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
                    <Radio.Group
                        disabled={!!transaction}
                        options={[
                            { label: 'Pagamento', value: 'income' },
                            { label: 'Despesa', value: 'expense' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>
                <Form.Item name="description" label="Descrição" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Flex gap={8}>
                    <Form.Item name="value" label="Valor" rules={[{ required: true }]} style={{ flexGrow: 1 }}>
                        <Input addonBefore="R$" type="number" min={0} />
                    </Form.Item>
                    <Form.Item name="date" label="Data" rules={[{ required: true }]} style={{ flexGrow: 1 }}>
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>
                </Flex>
                {!transaction ? (
                    <Form.Item name="installmentsCount" label="Parcelas" style={{ flexGrow: 1 }}>
                        <Input type="number" min={1} max={12} step={1} />
                    </Form.Item>
                ) : null}
                <Collapse defaultActiveKey={transaction ? ['1'] : []} bordered={false} items={optionalFields} />
            </Form>
        </Drawer>
    );
}

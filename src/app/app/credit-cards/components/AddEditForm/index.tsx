'use client';

import React, { useLayoutEffect } from 'react';
import { AddEditFormProps } from './types';
import { Button, Drawer, Flex, Form, Input, Select, Space } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import CreditCardModel from '@/models/CreditCardModel';
import { useFeedback } from '@/providers/FeedbackProvider';
import { CreditCard } from '@/types/CreditCard';

export default function AddEditForm(props: AddEditFormProps) {
    const { creditCard, open, onClose } = props;
    const queryClient = useQueryClient();
    const { showError } = useFeedback();
    const [form] = Form.useForm();
    const creditCardModel = new CreditCardModel();

    useLayoutEffect(() => {
        form.setFieldsValue({
            name: creditCard?.name || '',
            closingDay: creditCard?.closingDay || 1,
            dueDay: creditCard?.dueDay || 1,
            limit: creditCard?.limit || 0,
        });
    }, [creditCard]);

    const addCreditCard = useMutation(
        (creditCardData: Partial<CreditCard>) => {
            return creditCardModel.create({
                ...creditCardData,
                currency: 'BRL',
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('credit-cards');
                onClose();
            },
            onError: (e: any) => {
                showError('Erro ao atualizar o cartão', e);
            },
        },
    );

    const updateCreditCard = useMutation(
        (creditCardData: Partial<CreditCard> & { id: number }) => {
            return creditCardModel.update(creditCardData.id, { ...creditCardData });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('credit-cards');
                onClose();
            },
            onError: (e: any) => {
                showError('Erro ao atualizar o cartão', e);
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
        };

        if (creditCard?.id) {
            updateCreditCard.mutate({
                ...updatedValues,
                id: creditCard.id,
            });
        } else {
            addCreditCard.mutate(updatedValues);
        }
    }

    return (
        <Drawer
            title={creditCard ? 'Editar Cartão' : 'Adicionar Cartão'}
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
                            loading={addCreditCard.isLoading || updateCreditCard.isLoading}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="limit" label="Limite" rules={[{ required: true }]}>
                    <Input addonBefore="R$" type="number" />
                </Form.Item>
                <Flex gap={8}>
                    <Form.Item
                        name="closingDay"
                        label="Dia de fechamento"
                        rules={[{ required: true }]}
                        style={{ flex: 1 }}>
                        <Select
                            options={Array.from({ length: 31 }, (_, i) => ({
                                value: i + 1,
                                label: i + 1,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item name="dueDay" label="Dia de vencimento" rules={[{ required: true }]} style={{ flex: 1 }}>
                        <Select
                            options={Array.from({ length: 31 }, (_, i) => ({
                                value: i + 1,
                                label: i + 1,
                            }))}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </Drawer>
    );
}

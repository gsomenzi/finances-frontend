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
    Divider,
    Drawer,
    Flex,
    Form,
    Input,
    Radio,
    Select,
    Space,
} from 'antd';
import { Transaction } from '@/types/Transaction';
import ErrorAlert from '@/components/ErrorAlert';
import AccountModel from '@/models/AccountModel';
import dayjs from 'dayjs';
import TransactionModel from '@/models/TransactionModel';
import CategoryModel from '@/models/CategoryModel';
import AddCategoryForm from '../AddCategoryForm';
import AddTagForm from '../AddTagForm';
import TagModel from '@/models/TagModel';
const { TextArea } = Input;

export default function AddEditForm(props: AddEditFormProps) {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const accountModel = new AccountModel();
    const categoryModel = new CategoryModel();
    const tagModel = new TagModel();
    const transactionModel = new TransactionModel();
    const { transaction, open, onClose } = props;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [accountSearch, setAccountSearch] = useState<string>('');
    const [categorySearch, setCategorySearch] = useState<string>('');
    const [tagSearch, setTagSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');
    const [openCategoryForm, setOpenCategoryForm] = useState(false);
    const [openTagForm, setOpenTagForm] = useState(false);

    const transactionType = useMemo(() => {
        if (transaction?.relatedAccounts && transaction.relatedAccounts.find((a) => a.relation === 'income')) {
            return 'income';
        } else {
            return 'expense';
        }
    }, [transaction]);

    useLayoutEffect(() => {
        form.setFieldsValue({
            description: transaction?.description || '',
            type: transactionType,
            value: transaction?.value || '',
            date: transaction?.date ? dayjs(transaction.date) : dayjs(),
        });
    }, [transaction, transactionType]);

    useEffect(() => {
        setSelectedType(transactionType);
    }, [transactionType]);

    const { data: categories, isLoading: gettingCategories } = useQuery(
        ['categories', { page: 1, limit: 20, search: categorySearch, destination: selectedType }],
        () =>
            categoryModel.findManyByDestination(selectedType, {
                page: 1,
                limit: 20,
                search: categorySearch,
            }),
        {
            enabled: !!selectedType,
        },
    );

    const { data: accounts, isLoading: gettingAccounts } = useQuery(
        ['accounts', { page: 1, limit: 20, search: accountSearch }],
        () => accountModel.findMany({ page: 1, limit: 20, search: accountSearch }),
    );

    const { data: tags, isLoading: gettingTags } = useQuery(['tags', { page: 1, limit: 20, search: tagSearch }], () =>
        tagModel.findMany({ page: 1, limit: 20, search: tagSearch }),
    );

    const addTransaction = useMutation(
        (transactionData) => {
            setErrorMessage(null);
            return transactionModel.create(transactionData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                queryClient.invalidateQueries('balances');
                onClose();
            },
            onError: (e: any) => {
                setErrorMessage(e?.response?.data?.message || 'Erro ao criar a transação');
            },
        },
    );

    const updateTransaction = useMutation(
        (accountData: Transaction) => {
            setErrorMessage(null);
            return transactionModel.update(accountData.id, { ...accountData });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                queryClient.invalidateQueries('balances');
                onClose();
            },
            onError: (e: any) => {
                setErrorMessage(e?.response?.data?.message || 'Erro ao atualizar a transação');
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
            date: values.date.format('YYYY-MM-DD'),
            accountRelation: values.type,
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

    useEffect(() => {
        if (form && !transaction?.id && accounts?.data) {
            const defaultAccount = accounts.data.find((a) => a.default);
            form.setFieldValue('accountId', defaultAccount?.id);
        }
    }, [form, transaction, accounts]);

    const optionalFields: CollapseProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: 'Campos opcionais',
                children: (
                    <>
                        <Form.Item name="tagsIds" label="Tags" style={{ flexGrow: 1 }}>
                            <Select
                                showSearch
                                mode="multiple"
                                allowClear
                                placeholder="Selecione as tags"
                                optionFilterProp="name"
                                loading={gettingTags}
                                onSearch={setTagSearch}
                                options={tags?.data.map((tag) => ({
                                    label: tag.name,
                                    value: tag.id,
                                    name: tag.name,
                                }))}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <Button type="text" block onClick={() => setOpenTagForm(true)}>
                                            Criar tag
                                        </Button>
                                    </>
                                )}
                            />
                        </Form.Item>
                        <Form.Item name="notes" label="Observações">
                            <TextArea rows={4} />
                        </Form.Item>
                    </>
                ),
            },
        ];
    }, [tags, transaction]);

    return (
        <Drawer
            title={transaction ? 'Editar Transação' : 'Adicionar Transação'}
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
                            loading={addTransaction.isLoading || updateTransaction.isLoading}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <AddCategoryForm open={openCategoryForm} onClose={() => setOpenCategoryForm(false)} />
            <AddTagForm open={openTagForm} onClose={() => setOpenTagForm(false)} />
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
                    <Radio.Group
                        options={[
                            { label: 'Receita', value: 'income' },
                            { label: 'Despesa', value: 'expense' },
                        ]}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            form.setFieldValue('categoryId', '');
                        }}
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
                <Flex gap={8}>
                    <Form.Item name="accountId" label="Conta" rules={[{ required: true }]} style={{ flexGrow: 1 }}>
                        <Select
                            showSearch
                            placeholder="Selecione uma conta"
                            optionFilterProp="name"
                            loading={gettingAccounts}
                            onSearch={setAccountSearch}
                            options={accounts?.data.map((account) => ({
                                label: account.name,
                                value: account.id,
                                name: account.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Categoria" rules={[{ required: true }]} style={{ flexGrow: 1 }}>
                        <Select
                            showSearch
                            placeholder="Selecione uma categoria"
                            optionFilterProp="name"
                            loading={gettingCategories}
                            onSearch={setCategorySearch}
                            options={categories?.data.map((category) => ({
                                label: category.name,
                                value: category.id,
                                name: category.name,
                            }))}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <Button type="text" block onClick={() => setOpenCategoryForm(true)}>
                                        Criar categoria
                                    </Button>
                                </>
                            )}
                        />
                    </Form.Item>
                </Flex>
                <Form.Item name="paid" valuePropName="checked">
                    <Checkbox>A conta já foi paga</Checkbox>
                </Form.Item>
                <Collapse bordered={false} items={optionalFields} />
            </Form>
            <ErrorAlert show={!!errorMessage} title="Falha ao salvar a conta" description={errorMessage} />
        </Drawer>
    );
}

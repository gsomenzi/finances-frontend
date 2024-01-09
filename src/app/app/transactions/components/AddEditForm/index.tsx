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
import AccountModel from '@/models/AccountModel';
import dayjs from 'dayjs';
import TransactionModel from '@/models/TransactionModel';
import CategoryModel from '@/models/CategoryModel';
import AddCategoryForm from '../AddCategoryForm';
import AddTagForm from '../AddTagForm';
import TagModel from '@/models/TagModel';
import { useTransaction } from '../../providers/TransactionProvider';
import { useFeedback } from '@/providers/FeedbackProvider';
const { TextArea } = Input;

export default function AddEditForm(props: AddEditFormProps) {
    const [form] = Form.useForm();
    const { selectedTransaction, setSelectedTransaction } = useTransaction();
    const queryClient = useQueryClient();
    const accountModel = new AccountModel();
    const categoryModel = new CategoryModel();
    const tagModel = new TagModel();
    const transactionModel = new TransactionModel();
    const { showMessage, showNotification } = useFeedback();
    const [accountSearch, setAccountSearch] = useState<string>('');
    const [categorySearch, setCategorySearch] = useState<string>('');
    const [tagSearch, setTagSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');
    const [openCategoryForm, setOpenCategoryForm] = useState(false);
    const [openTagForm, setOpenTagForm] = useState(false);

    const transaction = selectedTransaction?.transaction || null;

    const transactionAccount = useMemo(() => {
        if (transaction?.relatedAccounts && transaction.relatedAccounts.length > 0) {
            return transaction?.relatedAccounts[0].account;
        } else {
            return null;
        }
    }, [transaction]);

    const transactionType = useMemo(() => {
        if (transaction?.relatedAccounts && transaction.relatedAccounts.find((a) => a.relation === 'income')) {
            return 'income';
        } else {
            return 'expense';
        }
    }, [transaction]);

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

    const categoriesOptions = useMemo(() => {
        if (!categories) {
            return [];
        }
        let options = categories.data.map((category) => ({
            label: category.name,
            name: category.name,
            value: category.id,
        }));
        if (transaction?.category?.id && !options.find((o) => o.value === transaction.category.id)) {
            options = options.concat({
                label: transaction.category.name,
                name: transaction.category.name,
                value: transaction.category.id,
            });
        }
        return options;
    }, [categories, transaction]);

    const { data: accounts, isLoading: gettingAccounts } = useQuery(
        ['accounts', { page: 1, limit: 20, search: accountSearch }],
        () => accountModel.findMany({ page: 1, limit: 20, search: accountSearch }),
        {
            onError: (e: any) => {
                showNotification('Erro', e?.response?.data?.message || 'Erro ao buscar contas', {
                    type: 'error',
                });
            },
        },
    );

    const accountsOptions = useMemo(() => {
        if (!accounts) {
            return [];
        }
        let options = accounts.data.map((account) => ({
            label: account.name,
            name: account.name,
            value: account.id,
        }));
        if (transaction?.relatedAccounts && transaction.relatedAccounts.length > 0) {
            options = options.concat(
                transaction.relatedAccounts
                    .map((account) => ({
                        label: account.account.name,
                        name: account.account.name,
                        value: account.account.id,
                    }))
                    .filter((a) => !options.find((o) => o.value === a.value)),
            );
        }
        return options;
    }, [accounts, transaction]);

    const { data: tags, isLoading: gettingTags } = useQuery(
        ['tags', { page: 1, limit: 20, search: tagSearch }],
        () => tagModel.findMany({ page: 1, limit: 20, search: tagSearch }),
        {
            onError: (e: any) => {
                showNotification('Erro', e?.response?.data?.message || 'Erro ao buscar tags', {
                    type: 'error',
                });
            },
        },
    );

    const tagsOptions = useMemo(() => {
        if (!tags) {
            return [];
        }
        let options = tags.data.map((tag) => ({
            label: tag.name,
            name: tag.name,
            value: tag.id,
        }));
        if (transaction?.tags && transaction.tags.length > 0) {
            options = options.concat(
                transaction.tags
                    .map((tag) => ({
                        label: tag.name,
                        name: tag.name,
                        value: tag.id,
                    }))
                    .filter((t) => !options.find((o) => o.value === t.value)),
            );
        }
        return options;
    }, [tags, transaction]);

    const addTransaction = useMutation(
        (transactionData: any) => {
            return transactionModel.create(transactionData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                queryClient.invalidateQueries('balances');
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
        (transactionData: Transaction) => {
            return transactionModel.update(transactionData.id, { ...transactionData });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                queryClient.invalidateQueries('balances');
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
        setSelectedTransaction({ transaction: null, action: null });
    }

    function handleSubmit(values: any) {
        const updatedValues = {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
            accountRelation: values.type,
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
                type: transactionType,
                value: transaction?.value,
                date: transaction?.date ? dayjs(transaction?.date) : null,
                categoryId: transaction?.category?.id,
                paid: transaction?.paid,
                accountId: transactionAccount?.id,
                notes: transaction?.notes,
            });
        } else {
            form.resetFields();
        }
    }, [transaction, transactionAccount, transactionType]);

    useEffect(() => {
        if (form && !transactionAccount?.id && accounts?.data) {
            const defaultAccount = accounts.data.find((a) => a.default);
            form.setFieldValue('accountId', defaultAccount?.id);
        }
    }, [accounts, form, transactionAccount]);

    useEffect(() => {
        setSelectedType(transactionType);
    }, [transactionType]);

    const optionalFields: CollapseProps['items'] = useMemo(() => {
        return [
            {
                key: '1',
                label: 'Campos opcionais',
                children: (
                    <>
                        {!transaction ? (
                            <Flex gap={8}>
                                <Form.Item name="installmentsCount" label="Parcelas" style={{ flexGrow: 1 }}>
                                    <Input type="number" min={1} max={12} step={1} />
                                </Form.Item>
                                <Form.Item name="installmentsPeriod" label="Período" style={{ flexGrow: 1 }}>
                                    <Select
                                        options={[
                                            { label: 'Semanas', value: 'week' },
                                            { label: 'Meses', value: 'month' },
                                            { label: 'Anos', value: 'year' },
                                        ]}
                                    />
                                </Form.Item>
                            </Flex>
                        ) : null}
                        <Form.Item name="tagsIds" label="Tags" style={{ flexGrow: 1 }}>
                            <Select
                                showSearch
                                mode="multiple"
                                allowClear
                                placeholder="Selecione as tags"
                                optionFilterProp="name"
                                loading={gettingTags}
                                onSearch={setTagSearch}
                                defaultValue={transaction?.tags?.map((tag) => tag.id) || []}
                                options={tagsOptions}
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
    }, [gettingTags, tagsOptions, transaction]);

    return (
        <Drawer
            title={transaction ? 'Editar Transação' : 'Adicionar Transação'}
            open={!!(selectedTransaction.action === 'add' || selectedTransaction.action === 'edit')}
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
            <AddCategoryForm open={openCategoryForm} onClose={() => setOpenCategoryForm(false)} />
            <AddTagForm open={openTagForm} onClose={() => setOpenTagForm(false)} />
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
                            options={accountsOptions}
                        />
                    </Form.Item>
                    <Form.Item name="categoryId" label="Categoria" rules={[{ required: true }]} style={{ flexGrow: 1 }}>
                        <Select
                            showSearch
                            placeholder="Selecione uma categoria"
                            optionFilterProp="name"
                            loading={gettingCategories}
                            onSearch={setCategorySearch}
                            options={categoriesOptions}
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
                <Collapse defaultActiveKey={transaction ? ['1'] : []} bordered={false} items={optionalFields} />
            </Form>
        </Drawer>
    );
}

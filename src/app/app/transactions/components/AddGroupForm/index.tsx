import React from 'react';
import { AddGroupFormProps } from './types';
import { Button, DatePicker, Drawer, Flex, Form, Input, List, Space, Typography } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import TransactionGroupModel, { CreateTransactionGroupPayload } from '@/models/TransactionGroupModel';
import { useTransaction } from '../../providers/TransactionProvider';
import dayjs from 'dayjs';
import { useFeedback } from '@/providers/FeedbackProvider';

export default function AddGroupForm(props: AddGroupFormProps) {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { showMessage, showNotification } = useFeedback();
    const { selectedForGroup, setSelectedTransactions, setSelectedForGroup } = useTransaction();
    const transactionGroupModel = new TransactionGroupModel();

    const { mutate: addGroup } = useMutation(
        (groupData: CreateTransactionGroupPayload) => {
            return transactionGroupModel.create({
                ...groupData,
                date: dayjs(groupData.date).format('YYYY-MM-DD'),
                transactionIds: selectedForGroup.map((t) => t.id),
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('transactions');
                setSelectedForGroup([]);
                showMessage('success', 'Transações agrupadas com sucesso!');
            },
            onError: (e: any) => {
                console.log(e);
                showNotification('Erro', e?.response?.data?.message || 'Erro ao agrupar as transações', {
                    type: 'error',
                });
            },
        },
    );

    function handleCancel() {
        setSelectedForGroup([]);
        setSelectedTransactions([]);
    }

    function handleSubmit(values: any) {
        addGroup(values);
    }

    return (
        <Drawer
            title="Agrupar transações"
            open={selectedForGroup.length > 0}
            onClose={handleCancel}
            footer={
                <Flex justify="end">
                    <Space>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={() => form.submit()} loading={false}>
                            Salvar
                        </Button>
                    </Space>
                </Flex>
            }>
            <Form
                initialValues={{
                    name:
                        selectedForGroup.length > 0
                            ? `${selectedForGroup[0].description} + ${selectedForGroup.length - 1} transações`
                            : '',
                    date: selectedForGroup.length > 0 ? dayjs(selectedForGroup[0].date) : dayjs(),
                }}
                form={form}
                onFinish={handleSubmit}
                layout="vertical">
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Data"
                    rules={[{ required: true }]}
                    style={{ flexGrow: 1 }}
                    help="Transações agrupadas devem ter a mesma data. Por isso, escolha a data destas transações">
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Typography.Title level={5}>Transações selecionadas</Typography.Title>
                    <List>
                        {selectedForGroup.map((t) => (
                            <List.Item key={t.id}>
                                <List.Item.Meta description={t.description} />
                            </List.Item>
                        ))}
                    </List>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

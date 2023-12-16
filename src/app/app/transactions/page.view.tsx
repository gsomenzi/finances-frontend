import React, { useState } from 'react';
import { TransactionsViewProps } from './types';
import { DatePicker, Flex, Typography, Input, FloatButton, Space, Popconfirm, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import { Transaction } from '@/types/Transaction';
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TransactionsView(props: TransactionsViewProps) {
    const {
        transactions,
        isLoading,
        isRemoving,
        page,
        limit,
        total,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
        onDateFilterChange,
    } = props;
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Transações</Typography.Title>
                <Space>
                    <Search placeholder="Pesquisa" onSearch={onSearch} style={{ width: 200 }} />
                    <RangePicker
                        format="DD/MM/YYYY"
                        allowClear={false}
                        defaultValue={[dayjs().startOf('month'), dayjs().endOf('month')]}
                        onChange={(range) => {
                            if (range) {
                                onDateFilterChange({
                                    startDate: dayjs(range[0]).format('YYYY-MM-DD'),
                                    endDate: dayjs(range[1]).format('YYYY-MM-DD'),
                                });
                            }
                        }}
                    />
                </Space>
            </Flex>
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setSelectedTransaction(null);
                    setOpen(true);
                }}
            />
            <AddEditForm open={open} onClose={() => setOpen(false)} transaction={selectedTransaction} />
            <Table
                dataSource={transactions}
                loading={isLoading}
                rowKey={(row) => row.id}
                columns={[
                    {
                        title: 'Descrição',
                        dataIndex: 'description',
                        key: 'description',
                    },
                    {
                        title: 'Conta',
                        dataIndex: 'account',
                        key: 'account',
                        render: (_, record) => record.relatedAccounts[0].account.name,
                    },
                    {
                        title: 'Categoria',
                        dataIndex: 'category',
                        key: 'category',
                        render: (_, record) => record.category?.name,
                    },
                    {
                        title: 'Valor',
                        dataIndex: 'value',
                        key: 'value',
                    },
                    {
                        title: 'Ações',
                        align: 'right',
                        width: 1,
                        render: (value, record) => (
                            <Space>
                                <Button
                                    type="text"
                                    onClick={() => {
                                        setSelectedTransaction(record);
                                        setOpen(true);
                                    }}>
                                    Editar
                                </Button>
                                <Popconfirm
                                    title="Você tem certeza?"
                                    description="Você tem certeza que deseja remover esta transação?"
                                    onConfirm={() => remove(record.id)}
                                    okButtonProps={{ loading: isRemoving }}>
                                    <Button type="text" danger>
                                        Remover
                                    </Button>
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
                pagination={{
                    defaultCurrent: page,
                    defaultPageSize: limit,
                    total: total,
                    onChange: onPageChange,
                    showSizeChanger: true,
                    onShowSizeChange: (_, newSize) => onSizeChange(newSize),
                }}
            />
        </div>
    );
}

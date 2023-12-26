import React, { useState } from 'react';
import { TransactionsViewProps } from './types';
import { DatePicker, Flex, Typography, Input, FloatButton, Space, Popconfirm, Button, Table } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import { Transaction } from '@/types/Transaction';
import TransactionsList from './components/TransactionsList';
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
        getTransactionTypeIcon,
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
            <TransactionsList loading={isLoading} transactions={transactions} />
            <Table
                dataSource={transactions}
                loading={isLoading}
                rowKey={(row) => row.id}
                columns={[
                    {
                        title: 'Descrição',
                        dataIndex: 'description',
                        key: 'description',
                        width: 400,
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
                        title: 'Data',
                        dataIndex: 'date',
                        key: 'date',
                        render: (_, record) => <span>{dayjs(record.date).format('DD/MM/YYYY')}</span>,
                    },
                    {
                        title: 'Valor',
                        dataIndex: 'value',
                        key: 'value',
                        render: (_, record) => (
                            <Space>
                                <span>{getTransactionTypeIcon(record.relatedAccounts[0].relation)}</span>
                                <span>{record.value}</span>
                            </Space>
                        ),
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

import React, { useState } from 'react';
import { TransactionsViewProps } from './types';
import { DatePicker, Flex, Typography, Input, FloatButton, Space, Popconfirm, Button, Table, Card } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import { Transaction } from '@/types/Transaction';
import TransactionsList from './components/TransactionsList';
import TransactionDetails from './components/TransactionDetails';
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
        transactionDates,
        remove,
        onPageChange,
        onSizeChange,
        onSearch,
        onDateFilterChange,
        getTransactionTypeIcon,
    } = props;
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
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
            <TransactionDetails
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                transaction={selectedTransaction}
            />
            {transactionDates.map((date) => (
                <Card
                    title={dayjs(date).format('DD/MM/YYYY')}
                    bordered={false}
                    type="inner"
                    style={{ marginBottom: '1rem' }}>
                    <TransactionsList
                        loading={isLoading}
                        transactions={transactions.filter((t) => t.date === date)}
                        onSelect={(transaction) => {
                            setSelectedTransaction(transaction);
                            setDetailsOpen(true);
                        }}
                    />
                </Card>
            ))}
        </div>
    );
}

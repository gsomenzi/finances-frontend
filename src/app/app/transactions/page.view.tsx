import React, { useState } from 'react';
import { TransactionsViewProps } from './types';
import { DatePicker, Flex, Typography, Input, FloatButton, Space, Card, Empty, Tooltip, Tag } from 'antd';
import { BankOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import { Transaction } from '@/types/Transaction';
import TransactionsList from './components/TransactionsList';
import TransactionDetails from './components/TransactionDetails';
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TransactionsView(props: TransactionsViewProps) {
    const {
        account,
        category,
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
        onAccountChange,
        onCategoryChange,
        onSearch,
        onDateFilterChange,
    } = props;
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Lançamentos</Typography.Title>
                <Space>
                    {account && (
                        <Tag color="blue" icon={<BankOutlined />} closable onClose={() => onAccountChange(null)}>
                            {account.name}
                        </Tag>
                    )}
                    {category && (
                        <Tag color="cyan" icon={<FolderOutlined />} closable onClose={() => onCategoryChange(null)}>
                            {category.name}
                        </Tag>
                    )}
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
            {transactionDates.length > 0 ? (
                transactionDates.map((date) => (
                    <Card
                        key={date}
                        title={
                            <Tooltip title={`${dayjs(date).diff(dayjs(), 'day')} dias atrás`}>
                                <Space>
                                    <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>
                                    <Typography.Text type="secondary">{dayjs(date).format('dddd')}</Typography.Text>
                                </Space>
                            </Tooltip>
                        }
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
                            onSelectAccount={(account) => onAccountChange(account)}
                            onSelectCategory={(category) => onCategoryChange(category)}
                        />
                    </Card>
                ))
            ) : (
                <Flex align="center" justify="center" style={{ marginTop: '2rem' }}>
                    <Empty description="Nenhuma transação encontrada" />
                </Flex>
            )}
        </div>
    );
}

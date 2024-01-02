import React from 'react';
import { TransactionsViewProps } from './types';
import { DatePicker, Flex, Typography, Input, FloatButton, Space, Card, Empty, Tooltip, Tag } from 'antd';
import { BankOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import TransactionsList from './components/TransactionsList';
import TransactionDetails from './components/TransactionDetails';
import { useTransaction } from './providers/TransactionProvider';
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TransactionsView(props: TransactionsViewProps) {
    const {
        account,
        category,
        generalBalanceOnStartDate,
        generalBalanceOnEndDate,
        transactions,
        isLoading,
        transactionDates,
    } = props;
    const { setAccount, setCategory, setSearch, setSelectedTransaction, setDateFilter } = useTransaction();
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Lançamentos</Typography.Title>
                <Space>
                    {account && (
                        <Tag color="blue" icon={<BankOutlined />} closable onClose={() => setAccount(null)}>
                            {account.name}
                        </Tag>
                    )}
                    {category && (
                        <Tag color="cyan" icon={<FolderOutlined />} closable onClose={() => setCategory(null)}>
                            {category.name}
                        </Tag>
                    )}
                    <Search placeholder="Pesquisa" onSearch={setSearch} style={{ width: 200 }} />
                    <RangePicker
                        format="DD/MM/YYYY"
                        allowClear={false}
                        defaultValue={[dayjs().startOf('month'), dayjs().endOf('month')]}
                        onChange={(range) => {
                            if (range) {
                                setDateFilter({
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
                    setSelectedTransaction({
                        transaction: null,
                        action: 'add',
                    });
                }}
            />
            <AddEditForm />
            <TransactionDetails />
            {transactionDates.length > 0 ? (
                <>
                    <Typography style={{ textAlign: 'right', marginBottom: '1rem' }}>
                        <Typography.Text>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                generalBalanceOnStartDate || 0,
                            )}
                        </Typography.Text>
                    </Typography>
                    {transactionDates.map((date) => (
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
                            />
                        </Card>
                    ))}
                    <Typography style={{ textAlign: 'right' }}>
                        <Typography.Text>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                generalBalanceOnEndDate || 0,
                            )}
                        </Typography.Text>
                    </Typography>
                </>
            ) : (
                <Flex align="center" justify="center" style={{ marginTop: '2rem' }}>
                    <Empty description="Nenhuma transação encontrada" />
                </Flex>
            )}
        </div>
    );
}

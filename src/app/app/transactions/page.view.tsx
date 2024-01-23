import React from 'react';
import { TransactionsViewProps } from './types';
import {
    DatePicker,
    Flex,
    Typography,
    Input,
    FloatButton,
    Space,
    Card,
    Empty,
    Tag,
    List,
    Row,
    Col,
    Button,
} from 'antd';
import { BankOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddEditForm from './components/AddEditForm';
import TransactionsList from './components/TransactionsList';
import TransactionDetails from './components/TransactionDetails';
import { useTransaction } from './providers/TransactionProvider';
import { motion } from 'framer-motion';
import AddGroupForm from './components/AddGroupForm';
import TransactionGroupsList from './components/TransactionGroupsList';
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function TransactionsView(props: TransactionsViewProps) {
    const {
        account,
        category,
        generalBalanceOnStartDate,
        generalBalanceOnEndDate,
        generalIncomeOnPeriod,
        generalExpenseOnPeriod,
        groups,
        transactions,
        getting,
        transactionDates,
        handleGroupTransactions,
    } = props;
    const {
        dateFilter,
        selectedTransactions,
        setAccount,
        setCategory,
        setSearch,
        setSelectedTransaction,
        setDateFilter,
    } = useTransaction();
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Lançamentos</Typography.Title>
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
            <AddGroupForm />
            <TransactionDetails />
            <motion.div layout>
                {selectedTransactions.length > 1 && (
                    <Flex justify="flex-end">
                        <Space style={{ marginBottom: '1rem' }}>
                            <Typography.Text>{selectedTransactions.length} selecionados</Typography.Text>
                            <Button type="primary" onClick={handleGroupTransactions}>
                                Agrupar
                            </Button>
                            <Button>Efetivar</Button>
                            <Button danger>Remover</Button>
                        </Space>
                    </Flex>
                )}
            </motion.div>
            {transactionDates.length > 0 ? (
                <>
                    <Row gutter={8}>
                        <Col span={16}>
                            <Space style={{ width: '100%' }} direction="vertical">
                                <Flex gap={16} align="center">
                                    <Search placeholder="Pesquisa" onSearch={setSearch} style={{ flexGrow: 1 }} />
                                    {account && (
                                        <Tag
                                            color="blue"
                                            icon={<BankOutlined />}
                                            closable
                                            onClose={() => setAccount(null)}>
                                            {account.name}
                                        </Tag>
                                    )}
                                    {category && (
                                        <Tag
                                            color="cyan"
                                            icon={<FolderOutlined />}
                                            closable
                                            onClose={() => setCategory(null)}>
                                            {category.name}
                                        </Tag>
                                    )}
                                    <RangePicker
                                        style={{ width: '300px' }}
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
                                </Flex>
                                {transactionDates.map((date) => (
                                    <Card
                                        key={date}
                                        title={
                                            <Space>
                                                <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>
                                                <Typography.Text type="secondary">
                                                    {dayjs(date).format('dddd')}
                                                </Typography.Text>
                                            </Space>
                                        }
                                        bordered={false}
                                        type="inner"
                                        style={{ marginBottom: '1rem' }}>
                                        <TransactionsList
                                            loading={getting}
                                            transactions={transactions.filter((t) => t.date === date)}
                                        />
                                        <TransactionGroupsList
                                            loading={getting}
                                            groups={groups.filter(
                                                (g) => g.transactions && g.transactions[0].date === date,
                                            )}
                                        />
                                    </Card>
                                ))}
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Card
                                title={
                                    <Flex justify="space-between">
                                        <Typography>Projeção do saldo</Typography>
                                        <Typography.Text type="secondary">
                                            {dayjs(dateFilter.startDate).format('DD/MM/YY')} até{' '}
                                            {dayjs(dateFilter.endDate).format('DD/MM/YY')}
                                        </Typography.Text>
                                    </Flex>
                                }>
                                <List size="small">
                                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Typography>Saldo inicial</Typography>
                                        <Typography>
                                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                                generalBalanceOnStartDate || 0,
                                            )}
                                        </Typography>
                                    </List.Item>
                                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Typography>Entradas</Typography>
                                        <Typography.Text type="success">
                                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                                generalIncomeOnPeriod || 0,
                                            )}
                                        </Typography.Text>
                                    </List.Item>
                                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Typography>Saídas</Typography>
                                        <Typography.Text type="danger">
                                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                                generalExpenseOnPeriod || 0,
                                            )}
                                        </Typography.Text>
                                    </List.Item>
                                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        <Typography>Saldo projetado</Typography>
                                        <Typography.Text strong>
                                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                                generalBalanceOnEndDate || 0,
                                            )}
                                        </Typography.Text>
                                    </List.Item>
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <Flex align="center" justify="center" style={{ marginTop: '2rem' }}>
                    <Empty description="Nenhuma transação encontrada" />
                </Flex>
            )}
        </div>
    );
}

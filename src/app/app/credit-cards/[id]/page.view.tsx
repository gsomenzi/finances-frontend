'use client';

import React, { useState } from 'react';
import { CreditCardDetailsViewProps } from './types';
import { Button, Card, Col, Divider, Flex, FloatButton, Input, Row, Space, Spin, Statistic, Typography } from 'antd';
import dayjs from 'dayjs';
import TransactionsList from './TransactionsList';
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import AddEditForm from './AddEditForm';
import { CreditCardTransaction } from '@/types/CreditCardTransaction';
import { statementStateTranslator } from '@/lib/statementStateTranslator';
const { Search } = Input;

export default function CreditCardDetailsView(props: CreditCardDetailsViewProps) {
    const {
        creditCard,
        statement,
        transactions,
        gettingCreditCard,
        gettingStatements,
        goPreviousDate,
        goNextDate,
        setSearch,
    } = props;
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<CreditCardTransaction | null>(null);
    return !creditCard ? (
        <Flex align="center" justify="center">
            <Spin />
        </Flex>
    ) : (
        <div>
            <Typography.Title level={2}>{creditCard.name}</Typography.Title>
            {!statement ? (
                <Flex align="center" justify="center">
                    <Spin />
                </Flex>
            ) : (
                <>
                    <Flex align="center" justify="center">
                        <Space>
                            <Button onClick={goPreviousDate} type="text" icon={<ArrowLeftOutlined />} />
                            <Typography.Title style={{ marginTop: 0, marginBottom: 0 }} level={4}>
                                {dayjs(statement.dueDate).format('MMMM YYYY')}
                            </Typography.Title>
                            <Button onClick={goNextDate} type="text" icon={<ArrowRightOutlined />} />
                        </Space>
                    </Flex>
                    <Divider />
                    <FloatButton
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setSelectedTransaction(null);
                            setOpen(true);
                        }}
                    />
                    <AddEditForm
                        statement={statement}
                        transaction={selectedTransaction}
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                    <Row gutter={[16, 16]}>
                        <Col span={16}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Search
                                    size="large"
                                    placeholder="Pesquisa"
                                    onSearch={setSearch}
                                    style={{ width: '100%' }}
                                />
                                <Card>
                                    <TransactionsList
                                        transactions={transactions}
                                        loading={gettingCreditCard || gettingStatements}
                                    />
                                </Card>
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Space size="middle" direction="vertical" style={{ width: '100%' }}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Valor da fatura"
                                        value={Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(Number(statement.value))}
                                    />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic title="Status" value={statementStateTranslator(statement.state)} />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Fechamento"
                                        value={dayjs(statement.closingDate).format('DD/MM/YYYY')}
                                    />
                                </Card>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Vencimento"
                                        value={dayjs(statement.dueDate).format('DD/MM/YYYY')}
                                    />
                                </Card>
                            </Space>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

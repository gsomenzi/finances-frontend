'use client';

import React, { useState } from 'react';
import { CreditCardDetailsViewProps } from './types';
import { Card, Col, Divider, FloatButton, Input, Row, Space, Statistic, Typography } from 'antd';
import dayjs from 'dayjs';
import TransactionsList from './TransactionsList';
import { PlusOutlined } from '@ant-design/icons';
import AddEditForm from './AddEditForm';
import { CreditCardTransaction } from '@/types/CreditCardTransaction';
const { Search } = Input;

export default function CreditCardDetailsView(props: CreditCardDetailsViewProps) {
    const { creditCard, statement, gettingCreditCard, gettingStatements } = props;
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<CreditCardTransaction | null>(null);
    return !creditCard || !statement ? (
        <div />
    ) : (
        <div>
            <Typography.Title level={2}>{creditCard.name}</Typography.Title>
            <Typography.Title level={4}>Fatura: {dayjs(statement.dueDate).format('MMMM YYYY')}</Typography.Title>
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
                        <Search size="large" placeholder="Pesquisa" onSearch={() => {}} style={{ width: '100%' }} />
                        <Card>
                            <TransactionsList
                                transactions={statement.transactions}
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
                                value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                    Number(statement.value),
                                )}
                            />
                        </Card>
                        <Card bordered={false}>
                            <Statistic title="Status" value={statement.state} />
                        </Card>
                        <Card bordered={false}>
                            <Statistic title="Vencimento" value={dayjs(statement.dueDate).format('DD/MM/YYYY')} />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

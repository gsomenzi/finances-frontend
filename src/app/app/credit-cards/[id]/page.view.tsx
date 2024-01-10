'use client';

import React, { useEffect } from 'react';
import { CreditCardDetailsViewProps } from './types';
import { Card, Descriptions, Divider, Typography } from 'antd';
import dayjs from 'dayjs';
import TransactionsList from './TransactionsList';

export default function CreditCardDetailsView(props: CreditCardDetailsViewProps) {
    const { creditCard, statement, gettingCreditCard, gettingStatements } = props;
    return !creditCard || !statement ? (
        <div />
    ) : (
        <div>
            <Typography.Title level={2}>{creditCard.name}</Typography.Title>
            <Divider />
            {/* Mostra a fatura e data no formato "mês por extenso e ano" */}
            <Typography.Title level={4}>Fatura: {dayjs(statement.dueDate).format('MMMM YYYY')}</Typography.Title>
            <Descriptions>
                <Descriptions.Item label="Valor da fatura">{statement.value}</Descriptions.Item>
                <Descriptions.Item label="Status">{statement.state}</Descriptions.Item>
                <Descriptions.Item label="Vencimento">
                    {dayjs(statement.dueDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
            </Descriptions>
            <Card>
                <TransactionsList
                    transactions={statement.transactions}
                    loading={gettingCreditCard || gettingStatements}
                />
            </Card>
        </div>
    );
}

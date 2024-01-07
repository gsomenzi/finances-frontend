import React from 'react';
import { BalancesListProps } from './types';
import { Card, List, Space, Typography } from 'antd';
import { useQuery } from 'react-query';
import AnalyticModel from '@/models/AnalyticModel';

export default function BalancesList(props: BalancesListProps) {
    const analyticModel = new AnalyticModel();
    const {} = props;

    const { data: balances, isLoading } = useQuery(['balances', 'all'], () => analyticModel.getAllAccountsBalances());

    const { data: generalBalance } = useQuery(['balances', 'general'], () => analyticModel.getGeneralBalance());

    return (
        <>
            <Card title="Saldo" loading={isLoading}>
                <List>
                    <List.Item>
                        <Space direction="vertical" size="small">
                            <Typography.Text strong>Saldo geral</Typography.Text>
                            <Typography.Text type="secondary">Somatório do saldo de todas as contas</Typography.Text>
                        </Space>
                        <Typography.Title level={5}>
                            {generalBalance?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography.Title>
                    </List.Item>
                </List>
                <Typography.Title level={5}>Minhas contas</Typography.Title>
                <List bordered={false} style={{ padding: 0 }}>
                    {balances &&
                        balances.map((balance) => (
                            <List.Item key={balance.id}>
                                <Typography.Text>{balance.name}:</Typography.Text>
                                <Typography.Text strong type={balance.balance < 0 ? 'danger' : 'success'}>
                                    {balance.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography.Text>
                            </List.Item>
                        ))}
                </List>
            </Card>
        </>
    );
}

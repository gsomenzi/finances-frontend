import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { BalancesListProps } from './types';
import { Card, List, Space, Typography } from 'antd';
import AccountModel from '@/models/AccountModel';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

export default function BalancesList(props: BalancesListProps) {
    const accountModel = new AccountModel();
    const {} = props;

    const { data: balances, isLoading } = useQuery(['balances'], () => accountModel.getAllAccountsBalances());

    const totalBalance = useMemo(() => {
        if (!balances) {
            return 0;
        }
        return balances.reduce((acc, cur) => {
            return acc + cur.balance;
        }, 0);
    }, [balances]);

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
                            {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography.Title>
                    </List.Item>
                </List>
                <Typography.Title level={5}>Minhas contas</Typography.Title>
                <List bordered={false} style={{ padding: 0 }}>
                    {balances?.map((balance) => (
                        <List.Item key={balance.accountId}>
                            <Typography.Text>{balance.accountName}:</Typography.Text>
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

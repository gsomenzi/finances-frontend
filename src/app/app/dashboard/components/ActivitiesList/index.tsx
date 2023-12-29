import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { ActivitiesListProps } from './types';
import AccountModel from '@/models/AccountModel';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Card, List, Space, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function ActivitiesList(props: ActivitiesListProps) {
    const accountModel = new AccountModel();
    const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    const {} = props;

    const { data: activities, isLoading } = useQuery(['activities', startDate, endDate], () =>
        accountModel.getAllAccountsActivities(startDate, endDate),
    );

    const totalIncome = useMemo(() => {
        if (!activities) {
            return 0;
        }
        return activities.reduce((acc, cur) => {
            return acc + cur.income;
        }, 0);
    }, [activities]);

    const totalExpense = useMemo(() => {
        if (!activities) {
            return 0;
        }
        return activities.reduce((acc, cur) => {
            return acc + cur.expense;
        }, 0);
    }, [activities]);

    return (
        <Card title="Movimentação deste mês" loading={isLoading}>
            <List>
                <List.Item>
                    <Space direction="vertical" size="small">
                        <Typography.Text strong>Movimentação geral</Typography.Text>
                        <Typography.Text type="secondary">Somatório das movimentações do mês</Typography.Text>
                    </Space>
                    <Space size="large">
                        <Space size="small">
                            <Typography.Title level={5}>
                                {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography.Title>
                            <Typography.Title type="success" level={5}>
                                <ArrowUpOutlined />
                            </Typography.Title>
                        </Space>
                        <Space size="small">
                            <Typography.Title level={5}>
                                {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography.Title>
                            <Typography.Title type="danger" level={5}>
                                <ArrowDownOutlined />
                            </Typography.Title>
                        </Space>
                    </Space>
                </List.Item>
            </List>
            <Typography.Title level={5}>Movimentação das contas</Typography.Title>
            <List bordered={false} style={{ padding: 0 }}>
                {activities?.map((activity) => (
                    <List.Item key={activity.accountId}>
                        <Typography.Text>{activity.accountName}:</Typography.Text>
                        <Space size="large">
                            <Space size="small">
                                <Typography.Text>
                                    {activity.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography.Text>
                                <Typography.Text type="success">
                                    <ArrowUpOutlined />
                                </Typography.Text>
                            </Space>
                            <Space size="small">
                                <Typography.Text>
                                    {activity.expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography.Text>
                                <Typography.Text type="danger">
                                    <ArrowDownOutlined />
                                </Typography.Text>
                            </Space>
                        </Space>
                    </List.Item>
                ))}
            </List>
        </Card>
    );
}

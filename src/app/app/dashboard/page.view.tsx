'use client';

import React from 'react';
import { DashboardViewProps } from './types';
import { Col, Flex, Row, Space, Typography } from 'antd';
import BalancesList from './components/BalancesList';
import ActivitiesList from './components/ActivitiesList';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';

export default function DashboardView(props: DashboardViewProps) {
    const {
        expenseByCategoryData,
        gettingExpenseByCategory,
        expenseByTagData,
        gettingExpenseByTag,
        expenseByDateData,
        gettingExpenseByDate,
    } = props;
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Dashboard</Typography.Title>
            </Flex>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <BalancesList />
                        <LineChart
                            loading={gettingExpenseByDate}
                            title="Despesas deste mês"
                            data={expenseByDateData ?? []}
                        />
                    </Space>
                </Col>
                <Col span={12}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <ActivitiesList />
                        <PieChart
                            loading={gettingExpenseByCategory}
                            title="Despesas deste mês por categoria"
                            data={expenseByCategoryData ?? []}
                            valueToPercent
                        />
                        <PieChart
                            loading={gettingExpenseByTag}
                            title="Despesas deste mês por tag"
                            data={expenseByTagData ?? []}
                            valueToPercent
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

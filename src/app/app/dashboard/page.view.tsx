'use client';

import React from 'react';
import { DashboardViewProps } from './types';
import { Button, Col, Flex, Row, Typography } from 'antd';
import BalancesList from './components/BalancesList';
import ActivitiesList from './components/ActivitiesList';

export default function DashboardView(props: DashboardViewProps) {
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Typography.Title level={2}>Dashboard</Typography.Title>
            </Flex>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <BalancesList />
                </Col>
                <Col span={12}>
                    <ActivitiesList />
                </Col>
            </Row>
        </div>
    );
}

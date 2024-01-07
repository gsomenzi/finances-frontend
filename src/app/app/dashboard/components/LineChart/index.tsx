'use client';

import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { LineChartProps } from './types';
import dynamic from 'next/dynamic';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
const Area = dynamic(() => import('@ant-design/plots').then((mod) => mod.Area), { ssr: false });

export default function LineChart(props: LineChartProps) {
    const { data, loading, title } = props;

    const config: any = useMemo(() => {
        return {
            data,
            xField: (d: any) => new Date(d.label),
            yField: (d: any) => d.value,
            locale: 'pt-BR',
            shapeField: 'smooth',
            tooltip: (data: any) => ({
                style: {
                    fontFamily: 'Roboto, sans-serif',
                },
                name: dayjs(data.label).format('DD/MM/YYYY'),
                value: Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(data.value),
            }),
        };
    }, [data, loading]);
    return (
        <Wrapper>
            <Card loading={!!loading} title={title}>
                {config.data.length > 0 && config.data.some((d: any) => d.value > 0) ? <Area {...config} /> : <Empty />}
            </Card>
        </Wrapper>
    );
}

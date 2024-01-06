'use client';

import React, { useMemo } from 'react';
import { Wrapper } from './styles';
import { PieChartProps } from './types';
import dynamic from 'next/dynamic';
import { Card, Empty } from 'antd';
const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), { ssr: false });

export default function PieChart(props: PieChartProps) {
    const { data, loading, title, valueToPercent } = props;

    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

    function getLabelText(value: number | string) {
        if (valueToPercent) {
            return `${((Number(value) * 100) / totalValue).toFixed(2)}%`;
        }
        return String(value);
    }

    const config = useMemo(() => {
        return {
            data,
            angleField: 'value',
            colorField: 'label',
            legend: {
                color: {
                    title: false,
                    position: 'right',
                    rowPadding: 10,
                },
            },
            label: {
                text: ({ value }: any) => `${getLabelText(value)}`,
                style: {
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    textAlign: 'center',
                },
            },
            tooltip: (data: any) => ({
                style: {
                    fontFamily: 'Roboto, sans-serif',
                },
                name: data.label,
                value: Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(data.value),
            }),
            interactions: [
                {
                    type: 'pie-legend-active',
                },
                {
                    type: 'element-active',
                },
            ],
        };
    }, [data, loading]);
    return (
        <Wrapper>
            <Card loading={!!loading} title={title}>
                {config.data.length > 0 ? <Pie {...config} /> : <Empty />}
            </Card>
        </Wrapper>
    );
}

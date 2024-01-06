import { ReactNode } from 'react';

export type PieChartProps = {
    title: string;
    loading?: boolean;
    valueToPercent?: boolean;
    data: {
        label: string;
        value: number;
    }[];
};

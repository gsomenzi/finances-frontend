import { ReactNode } from 'react';

export type LineChartProps = {
    title: string;
    loading?: boolean;
    valueToPercent?: boolean;
    data: {
        label: string;
        value: number;
    }[];
};

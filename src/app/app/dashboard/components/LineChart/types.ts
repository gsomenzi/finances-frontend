export type LineChartProps = {
    title: string;
    loading?: boolean;
    data: {
        label: string;
        value: number;
    }[];
};

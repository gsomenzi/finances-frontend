import { LabelValueChartDataType } from '@/types/LabelValueChartDataType';

export type DashboardViewProps = {
    expenseByCategoryData?: LabelValueChartDataType;
    gettingExpenseByCategory: boolean;
    expenseByTagData?: LabelValueChartDataType;
    gettingExpenseByTag: boolean;
    expenseByDateData?: LabelValueChartDataType;
    gettingExpenseByDate: boolean;
    handleLogout: () => void;
};

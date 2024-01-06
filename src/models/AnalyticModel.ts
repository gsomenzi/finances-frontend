import { LabelValueChartDataType } from '@/types/LabelValueChartDataType';
import _ApiModel from './_ApiModel';

export default class AnalyticModel extends _ApiModel<any, any> {
    protected url = '/analytics';

    getExpenseByCategory(startDate: string, endDate: string): Promise<LabelValueChartDataType> {
        return this.apiClient.get(`${this.url}/expense-by-category`, {
            startDate,
            endDate,
        });
    }

    getExpenseByTag(startDate: string, endDate: string): Promise<LabelValueChartDataType> {
        return this.apiClient.get(`${this.url}/expense-by-tag`, {
            startDate,
            endDate,
        });
    }

    getExpenseByDate(startDate: string, endDate: string): Promise<LabelValueChartDataType> {
        return this.apiClient.get(`${this.url}/expense-by-date`, {
            startDate,
            endDate,
        });
    }
}

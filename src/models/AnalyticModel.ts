import { LabelValueChartDataType } from '@/types/LabelValueChartDataType';
import _ApiModel from './_ApiModel';
import { AccountBalance } from '@/types/AccountBalance';
import { AccountActivity } from '@/types/AccountActivity';
import AccountModel from './AccountModel';

export default class AnalyticModel extends _ApiModel<any, any> {
    accountModel = new AccountModel();
    protected url = '/analytics';

    getGeneralBalance(): Promise<{ balance: number }> {
        return this.apiClient.get(`${this.url}/general-balance`);
    }

    getGeneralBalanceProjection(date: string): Promise<{ balance: number }> {
        return this.apiClient.get(`${this.url}/general-balance-projection`, {
            date: date,
        });
    }

    getAccountBalance(accountId: number): Promise<AccountBalance> {
        return this.apiClient.get(`${this.url}/account-balance/${accountId}`);
    }

    getAllAccountsBalances = async () => {
        const { data: accounts } = await this.accountModel.findMany({ limit: 20 });
        const balances = await Promise.all(accounts.map(async (a) => await this.getAccountBalance(a.id)));
        return balances;
    };

    getAccountActivity(accountId: number, startDate: string, endDate: string): Promise<AccountActivity> {
        return this.apiClient.get(`${this.url}/account-activity/${accountId}`, {
            startDate,
            endDate,
        });
    }

    getAllAccountsActivities = async (startDate: string, endDate: string) => {
        const { data: accounts } = await this.accountModel.findMany({ limit: 20 });
        const balances = await Promise.all(
            accounts.map(async (a) => await this.getAccountActivity(a.id, startDate, endDate)),
        );
        return balances;
    };

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

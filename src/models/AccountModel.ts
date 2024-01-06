import { Account } from '@/types/Account';
import _ApiModel from './_ApiModel';
import dayjs from 'dayjs';
import { AccountBalance } from '@/types/AccountBalance';
import { AccountActivity } from '@/types/AccountActivity';

export default class AccountModel extends _ApiModel<Account, Partial<Account>> {
    protected url = '/accounts';

    public getAccountsBalances(accountIds: number[]): Promise<AccountBalance[]> {
        return this.apiClient.get(`${this.url}/balances`, {
            accountIds: accountIds.join(',') || '',
        });
    }

    public getAllAccountsBalances(projectionDate?: string): Promise<AccountBalance[]> {
        return this.apiClient.get(`${this.url}/balances`, {
            projectionDate: projectionDate || null,
        });
    }

    public getAccountsActivities(accountIds: number[], startDate: string, endDate: string): Promise<AccountActivity[]> {
        return this.apiClient.get(`${this.url}/activities`, {
            accountIds: accountIds.join(',') || '',
            startDate,
            endDate,
        });
    }

    public getAllAccountsActivities(startDate: string, endDate: string): Promise<AccountActivity[]> {
        if (!startDate) {
            startDate = dayjs().startOf('month').format('YYYY-MM-DD');
        }
        if (!endDate) {
            endDate = dayjs().endOf('month').format('YYYY-MM-DD');
        }
        return this.apiClient.get(`${this.url}/activities`, {
            startDate,
            endDate,
        });
    }
}

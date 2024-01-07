import { Account } from '@/types/Account';
import _ApiModel from './_ApiModel';
import dayjs from 'dayjs';
import { AccountBalance } from '@/types/AccountBalance';

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
}

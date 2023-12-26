import { Account } from '@/types/Account';
import _ApiModel from './_ApiModel';

export default class AccountModel extends _ApiModel<Account> {
    protected url = '/accounts';

    public getAccountsBalances(accountIds: number[]): Promise<any> {
        return this.apiClient.get(`${this.url}/balances`, {
            accountIds: accountIds.join(',') || '',
        });
    }
}

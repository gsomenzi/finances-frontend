import _ApiModel from './_ApiModel';
import { Transaction } from '@/types/Transaction';

export default class TransactionModel extends _ApiModel<Transaction, Partial<Transaction>> {
    protected url = '/transactions';

    public togglePaid(id: number | string): Promise<Transaction> {
        return this.apiClient.put(`${this.url}/${id}/paid`, {});
    }
}

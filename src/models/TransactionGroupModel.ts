import { TransactionGroup } from '@/types/TransactionGroup';
import _ApiModel from './_ApiModel';

type CreateTransactionGroupPayload = Pick<TransactionGroup, 'name' | 'type' | 'notes'> & {
    transactionIds: number[];
};

export default class TransactionGroupModel extends _ApiModel<
    TransactionGroup,
    CreateTransactionGroupPayload,
    CreateTransactionGroupPayload
> {
    protected url = '/transaction-groups';

    public create(data: CreateTransactionGroupPayload): Promise<TransactionGroup> {
        data.type = 'group';
        return this.apiClient.post(this.url, data);
    }
}

import { CreditCardTransaction } from '@/types/CreditCardTransaction';
import _ApiModel from './_ApiModel';

export default class CreditCardTransactionModel extends _ApiModel<
    CreditCardTransaction,
    Partial<CreditCardTransaction>
> {
    protected url = '/card-transactions';
}

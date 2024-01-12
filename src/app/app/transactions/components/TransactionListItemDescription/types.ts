import { Account } from '@/types/Account';
import { Transaction } from '@/types/Transaction';
import { TransactionGroup } from '@/types/TransactionGroup';

export type TransactionListItemDescriptionProps = {
    account: Pick<Account, 'id' | 'name' | 'description' | 'default' | 'type' | 'currency'> | null;
    category: Transaction['category'];
    isGrouped: boolean;
    group: TransactionGroup | null;
    installmentsNumber: number;
};

import { CreditCard } from '@/types/CreditCard';
import _ApiModel from './_ApiModel';

export default class CreditCardModel extends _ApiModel<CreditCard, Partial<CreditCard>> {
    protected url = '/credit-cards';
}

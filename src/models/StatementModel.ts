import { Statement } from '@/types/Statement';
import _ApiModel from './_ApiModel';

export default class StatementModel extends _ApiModel<Statement, Partial<Statement>> {
    protected url = '/statements';

    findOneByDate(creditCardId: number, date: string): Promise<Statement> {
        return this.apiClient.get(`${this.url}/${creditCardId}/date/${date}`);
    }
}

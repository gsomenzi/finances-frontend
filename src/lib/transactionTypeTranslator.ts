export function transactionTypeTranslator(type: string): string {
    switch (type) {
        case 'expense':
            return 'Despesa';
        case 'income':
            return 'Receita';
        case 'transfer_in':
            return 'Transferência recebida';
        case 'transfer_out':
            return 'Transferência enviada';
        default:
            return 'Transação';
    }
}

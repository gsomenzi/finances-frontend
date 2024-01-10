export function statementStateTranslator(state: string): string {
    switch (state) {
        case 'opened':
            return 'Aberta';
        case 'closed':
            return 'Fechada';
        case 'expired':
            return 'Vencida';
        case 'paid':
            return 'Paga';
        default:
            return state;
    }
}

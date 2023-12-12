export function accountTypeTranslator(type: string): string {
    switch (type) {
        case 'checkings':
            return 'Conta Corrente';
        case 'investment':
            return 'Conta de Investimentos';
        case 'other':
            return 'Outros';
        default:
            return 'Conta';
    }
}

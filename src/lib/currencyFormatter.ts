export function currencyFormatter(value: number | string, currency: string = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(convertStringToNumber(value));
}

function convertStringToNumber(value: string | number) {
    if (typeof value === 'number') {
        return value;
    }
    return Number(value.replace(/\D/g, ''));
}

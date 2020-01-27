export function noDecimalsEuroFormatter(value) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(value)
}

export function defaultNumberFormatter(value) {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 0
    }).format(value);
}

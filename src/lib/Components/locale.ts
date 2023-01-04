const locale = 'en-US';
const currency = 'USD';

export function formatCurrency(value: number) {
	return `${new Intl.NumberFormat(locale, {
		currency: currency,
		maximumFractionDigits: 0,
		style: 'currency'
	}).format(value)} ${currency}`;
}

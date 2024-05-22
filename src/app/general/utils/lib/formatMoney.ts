export const formatMoney = (amount: number) => {
    const currencyCode = 'NGN';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'us' }).format(amount);
};

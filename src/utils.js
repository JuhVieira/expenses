export function formatMoney(number) {
    return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
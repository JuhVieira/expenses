export function formatMoney(number) {
    console.log(number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
    return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
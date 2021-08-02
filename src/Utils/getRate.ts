import {toShortname} from "./toShortname";


export async function getRate(state:any) {
    const url:string = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${toShortname(state.inpCurrency).toLowerCase()}/${toShortname(state.outCurrency).toLowerCase()}.json`;
    return await fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => alert(err));
}
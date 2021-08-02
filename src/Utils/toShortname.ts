export const toShortname = (name:string) => {
    let result = '';
    const nStr = name.split('');

    for (let i = 0;i <= 2; i++){
        result += nStr[i];
    }

    return result;
}
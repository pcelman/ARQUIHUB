'use strict'
  function BinarioADecimal(num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);
    }
    return sum;
}


function DecimalABinario(num) {
  // tu codigo aca
    return (i<1)?"":DecimalABinario((i-(i%2))/2)+i%2; 
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}
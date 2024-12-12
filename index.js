/**
 *
 * @param {real} x the number to be sqaured
 * @returns {real} result1 the square of x
 */


// sqaure func
function square(x) {
    result1 = x * x; //global scope variable;
    return result1;
}

function another_square(x) {
    const result2 = x * x; //local scope variable;
    return x * x;
}

function yet_another_square(x) {
    const result3 = x * x; //local scope variable;
    return x * x;
}

console.log(square(4)) //16
console.log(another_square(5)) //25
console.log(result1) //16
console.log(result2) //error
console.log(result3) //error



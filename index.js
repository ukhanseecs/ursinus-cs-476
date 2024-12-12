/**
 *
 * @param {real} x the number to be sqaured
 * @returns {real} result1 the square of x
 */


function quadratic_equ(a, b, c) {
    underroot_term = Math.sqrt(b*b - 4*a*c)
    divide_term =2*a
    add_term = -b
    x1 =(add_term + underroot_term)/(divide_term)
    x2 =(add_term - underroot_term)/(divide_term)
    return console.log(x1, x2)
}

quadratic_equ(1, 4, 3)

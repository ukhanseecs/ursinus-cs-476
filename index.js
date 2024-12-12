/**
 *
 * @param {real} x the number to be sqaured
 * @returns {real} result1 the square of x
 */


function quadratic_equ(a, b, c) {
    underroot_term = b*b - 4*a*c
    if (underroot_term < 0) {
        return { error : 'no real roots'}
    }
    divide_term =2*a
    add_term = -b
    x1 =(add_term + Math.sqrt(underroot_term))/(divide_term)
    x2 =(add_term - Math.sqrt(underroot_term))/(divide_term)
    return { x1, x2}
}

console.log(quadratic_equ(1, 4, 3))

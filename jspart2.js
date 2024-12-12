/**
 *
 * @param {list} array of numerical values
 * @returns {float} mean of the array
 */
function mean_of_arr(array){
    let sum_of_array = 0
    for (let i=0; i < array.length; i++) {
        sum_of_array = array[i] + sum_of_array
    }
    const mean_of_array = sum_of_array/array.length
    return {sum_of_array, mean_of_array}
}

const arr = [3,4,5,6]
console.log(mean_of_arr(arr))
// Task: provide 3 unique implementations of the following function in javascript
// Input: `n` - any integer
// Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER. 
// Output: return - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

var sum_to_n_a = function(n) {
    // using arithmetic series formula
    if (n < 0) {
        return 0;
    }
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    // recursive
    if (n < 0) {
        return 0;
    }
    return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function(n) {
    // iterative
    if (n < 0) {
        return 0;
    }
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};


//  test cases
console.log(sum_to_n_a(5) === 15);
console.log(sum_to_n_b(5) === 15);
console.log(sum_to_n_c(5) === 15);
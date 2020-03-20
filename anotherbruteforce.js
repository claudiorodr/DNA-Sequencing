var fs = require('fs');

module.exports = {
    main: function (n, x, dx) {
        var Lbrute = dx
        var Xbrute = []
        var M = Lbrute[Lbrute.length - 1]
        var Nbrute = n
        var result_set = []
        var delta = []
        Lbrute.pop()
        subSet(Lbrute, Nbrute)

        function subSet(L, n) {
            for (var x = 0; x < Math.pow(2, L.length); x++) {
                result = [];
                i = L.length - 1;
                do {
                    if ((x & (1 << i)) !== 0) {
                        result.push(L[i]);
                    }
                } while (i--);

                if (result.length == n) {
                    // result_set.push(result.sort((a, b) => a - b));
                    calculateDX(result)

                    console.log('Isto é o resultado ' + L + ' e isto é o delta ' + delta);
                    if (JSON.stringify(delta) == JSON.stringify(L)) {
                        console.log('Found the solution!');
                    }

                    delta = []
                }
            }
            // console.log(result_set);
            console.log('THIS HAS ENDED');

        }

        function calculateDX(array) {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (array[j] - array[i] > 0) {
                        delta.push(array[j] - array[i])
                        delta = delta.sort((a, b) => a - b)
                    }
                }
            }
        }
    }
}
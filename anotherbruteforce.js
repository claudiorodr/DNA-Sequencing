var fs = require('fs');
var combinations = require('./combinations')

module.exports = {
    main: function (n, x, dx) {
        var Lbrute = dx
        var Xbrute = []
        var M = Lbrute[Lbrute.length - 1]
        var Nbrute = n
        var delta = []
        Lbrute.pop()
        combinations(Lbrute, Nbrute - 2)
        Lbrute.push(M)
        var combs = combinations.combs

        calculateDX(combs)

        function calculateDX(combs) {
            var array = []
            for (let combination = 0; combination < combs.length; combination++) {
                array = combs[combination]
                array.unshift(0)
                array.push(M)

                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array.length; j++) {
                        if (array[j] - array[i] > 0) {
                            delta.push(array[j] - array[i])
                            delta = delta.sort((a, b) => a - b)
                        }
                    }
                }
                // console.log(delta);
                // console.log(Lbrute);

                if (JSON.stringify(delta) == JSON.stringify(Lbrute)) {
                    fs.appendFileSync("./filesWrite.txt",
                        "----------------------------- AnotherBruteForcePDP Algorithm ----------------------------- \n" +
                        "Restriction map of points (X): " + array + "\n"
                    );

                }
                delta = []
            }
        }
    }
}
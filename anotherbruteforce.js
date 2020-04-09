var fs = require('fs');
var combinations = require('./combinations')

module.exports = {
    main: function (n, x, dx, res) {
        var Nbrute = n //receives number of cuts
        var Lbrute = dx//receives list of pairwise distances
        var Xbrute = [] //we want to calculate X
        var M = Lbrute[Lbrute.length - 1] //Maximum element in L
        var delta = [] //Array that will store all cut distances
        Lbrute.pop() //Taking out length of L
        combinations(Lbrute, Nbrute) //Call file that calculates all possible combinations of Nbrute integers in the Lbrute array
        var combs = combinations.combs //Using the result of the previous function
        Lbrute.push(M) //Putting back the maximum length
        calculateDX(combs) //calculating the pairwaise distances of all possible combinations


        function calculateDX(combs) {
            var array = []
            for (let combination = 0; combination < combs.length; combination++) { //For every single possible combination, we calculate the pairwise distances X, and see if this combination is possible
                array = combs[combination]
                array.unshift(0) //push 0 to the begging of the array
                array.push(M) //push Maximum element the the end of the array

                for (let i = 0; i < array.length; i++) { //Calculates pairwise distances
                    for (let j = 0; j < array.length; j++) {
                        if (array[j] - array[i] > 0) {
                            delta.push(array[j] - array[i])
                            delta = delta.sort((a, b) => a - b)
                        }
                    }
                }

                if (JSON.stringify(delta) == JSON.stringify(Lbrute)) {
                    console.log('Found the solution');

                    fs.appendFileSync("./filesWrite.txt",
                        "----------------------------- AnotherBruteForcePDP Algorithm ----------------------------- \n" +
                        "Restriction map of points (X): " + array + "\n"
                    );
                    res.download(`${__dirname}/filesWrite.txt`); // Set disposition and send it.

                    break;
                }
                delta = []
            }
        }
    }
}
var fs = require('fs');

module.exports = {
    main: function (n, x, dx, res) {

        var y = 0
        var Lpartial = dx //takes as input the List of pairwise distances
        var Xpartial = []
        var deltaY = []
        var index = 0
        var hasFinished = false
        var width = Lpartial[Lpartial.length - 1] //Maximum element in L
        Xpartial.push(0, width) //Inserts into array the elements 0 and Maximum element in L
        Lpartial.pop() //Removes Maximum element of L
        place(Lpartial, Xpartial) //Recursive call

        function place(Lpartial, Xpartial) {
            var hasElements = false //To check if we can exit recursive function

            if (Lpartial.length == 0 && hasFinished == false) { //Checking if we have reached the final solution
                fs.appendFileSync("./filesWrite.txt",
                    "----------------------------- Partial Digest Algorithm ----------------------------- \n" +
                    "Restriction map of points (X): " + Xpartial + "\n"
                );
                res.download(`${__dirname}/filesWrite.txt`); // Set disposition and send it.
                hasFinished = true
            } else if (Lpartial.length > 0) { //Only performs this code if L is not empty
                y = Lpartial[Lpartial.length - 1] //Takes maximum element in L
                console.log(y + '\n');

                Xpartial.forEach(element => { //Calculates distance to every element in array X, ∆(y, X) ⊆ L
                    deltaY.push(Math.abs(y - element))
                    console.log(deltaY);
                });

                let subset = (arr, target) => target.every(v => arr.includes(v)); //function that takes two arrays, and sees if the second one is included in the first one
                console.log(subset(Lpartial, deltaY));

                if (subset(Lpartial, deltaY)) { //if the sets of distance from every element in array X and y is included in L
                    Xpartial.push(y) //we add y to X
                    Xpartial = Xpartial.filter((a, b) => Xpartial.indexOf(a) === b) //function to make sure it doesn't delete any duplicate elements
                    deltaY.forEach(element => { //
                        index = Lpartial.indexOf(element)
                        Lpartial.splice(index, 1) //Removes the ∆(y, X) from L
                    });
                    console.log(Xpartial.sort((a, b) => a - b) + '\n' + ' first If');
                    console.log(Lpartial.sort((a, b) => a - b) + '\n' + ' first If');
                    hasElements = true
                }
                deltaY = []

                if (hasElements) {
                    place(Lpartial, Xpartial) //calls again recursive function
                }

                widthy = width - y //Now performs the same calculations, now only to width - y 

                Xpartial.forEach(element => {
                    deltaY.push(Math.abs(widthy - element))
                    console.log(deltaY);

                });
                console.log(subset(Lpartial, deltaY));

                if (subset(Lpartial, deltaY)) {
                    Xpartial.push(widthy)
                    Xpartial = Xpartial.filter((a, b) => Xpartial.indexOf(a) === b)
                    deltaY.forEach(element => {
                        index = Lpartial.indexOf(element)
                        Lpartial.splice(index, 1)
                    });
                    console.log(Xpartial.sort((a, b) => a - b) + '\n' + ' second If');
                    console.log(Lpartial.sort((a, b) => a - b) + '\n' + ' second If');
                    hasElements = true
                }

                deltaY = []
                if (hasElements) {
                    place(Lpartial, Xpartial)
                }

            }
        }
    },
}
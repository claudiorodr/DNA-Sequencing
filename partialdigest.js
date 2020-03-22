var fs = require('fs');

module.exports = {
    main: function (n, x, dx, res) {

        var y = 0
        var Lpartial = dx
        var Xpartial = []
        var deltaY = []
        var index = 0
        var hasFinished = false
        var width = Lpartial[Lpartial.length - 1]
        Xpartial.push(0, width)
        Lpartial.pop()
        place(Lpartial, Xpartial)

        function place(Lpartial, Xpartial) {
            var hasElements = false

            if (Lpartial.length == 0 && hasFinished == false) {
                fs.appendFileSync("./filesWrite.txt",
                    "----------------------------- Partial Digest Algorithm ----------------------------- \n" +
                    "Restriction map of points (X): " + Xpartial + "\n"
                );
                res.download(`${__dirname}/filesWrite.txt`); // Set disposition and send it.
                hasFinished = true
            } else if (Lpartial.length > 0) {
                y = Lpartial[Lpartial.length - 1]
                console.log(y + '\n');

                Xpartial.forEach(element => {
                    deltaY.push(Math.abs(y - element))
                    console.log(deltaY);
                });

                let subset = (arr, target) => target.every(v => arr.includes(v));
                console.log(subset(Lpartial, deltaY));
                
                if (subset(Lpartial, deltaY)) {
                    Xpartial.push(y)
                    Xpartial = Xpartial.filter((a, b) => Xpartial.indexOf(a) === b)
                    deltaY.forEach(element => {
                        index = Lpartial.indexOf(element)
                        Lpartial.splice(index, 1)
                    });
                    console.log(Xpartial.sort((a, b) => a - b) + '\n' + ' first If');
                    console.log(Lpartial.sort((a, b) => a - b) + '\n' + ' first If');
                    hasElements = true
                }
                deltaY = []

                if (hasElements) {
                    place(Lpartial, Xpartial)
                }

                widthy = width - y

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
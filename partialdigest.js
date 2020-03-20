var fs = require('fs');

module.exports = {
    main: function (n, x, dx) {

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
                hasFinished = true
            } else if (Lpartial.length > 0) {
                y = Lpartial[Lpartial.length - 1]
                console.log(y + '\n');

                Xpartial.forEach(element => {
                    deltaY.push(Math.abs(y - element))
                    console.log(deltaY);

                });

                Lpartial.pop()

                deltaY.forEach(element => {
                    console.log(Lpartial.includes(element));

                    if (Lpartial.includes(element)) {
                        Xpartial.push(y)
                        Xpartial = Xpartial.filter((a, b) => Xpartial.indexOf(a) === b)
                        index = Lpartial.indexOf(element)
                        Lpartial.splice(index, 1)
                        deltaY = []
                        console.log(Xpartial.sort((a, b) => a - b) + '\n' + 'first If');
                        console.log(Lpartial.sort((a, b) => a - b) + '\n' + 'first If');
                        hasElements = true
                    }
                });

                if (hasElements) {
                    place(Lpartial, Xpartial)
                }

                widthy = width - y

                Xpartial.forEach(element => {
                    deltaY.push(Math.abs(widthy - element))
                    // console.log(deltaY);

                });

                deltaY.forEach(element => {
                    if (Lpartial.includes(element)) {
                        Xpartial.push(widthy)
                        Xpartial = Xpartial.filter((a, b) => Xpartial.indexOf(a) === b)
                        index = Lpartial.indexOf(element)
                        Lpartial.splice(index, 1)
                        deltaY = []
                        console.log(Xpartial.sort((a, b) => a - b) + '\n' + 'Second If');
                        console.log(Lpartial.sort((a, b) => a - b) + '\n' + 'Second If');
                    }
                });

                place(Lpartial, Xpartial)
            }
        }
    },
}
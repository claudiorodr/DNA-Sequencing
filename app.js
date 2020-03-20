var brute = require('./anotherbruteforce')
var partial = require('./partialdigest')
const express = require('express')
var fs = require('fs')
const upload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000

var n = 0
var x = []
var dx = []

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`))

app.get('/', (req, res) => res.redirect("/partialdigest.html")) //Getting HTML from file

app.get('/partialdigest.html', (req, res) => res.sendFile(__dirname + "/partialdigest.html")) //Getting HTML from file

app.get('/anotherbruteforce.html', (req, res) => res.sendFile(__dirname + "/anotherbruteforce.html")) //Getting HTML from file

app.post('/partialdigest.html', function (req, res) { //When posting from this route, from the form
    handleRequest("PartialDigest", req);
})

app.post('/anotherbruteforce.html', function (req, res) { //When posting from this route, from the form
    handleRequest("BruteForceAlgorithm", req);
})

function handleRequest(type, req) {
    var filename = req.files.file.name //Uploaded filename
    var path = './files/' + filename //Move file to local server path
    var search = req.body.text.replace(/ /g, '') //Getting sequence inserted

    req.files.file.mv(path, function (err) { //Moving file to specified local path
        if (err) {
            res.send(err)
        } else {
            try {
                readDNA(path, search) //if successfully completed start reading file
            } catch (e) {
                console.error(e)
            }
            const file = `${__dirname}/filesWrite.txt`;
            if (type == "BruteForceAlgorithm") {
                brute.main(n, x, dx)
            } else {
                partial.main(n, x, dx)
            }
            //   res.download(file); // Set disposition and send it.
        }
    })
}

function readDNA(path, search) {

    var delta = [] //Array used to store Delta X values
    var indexes = [] //Array used to store indexes values
    var searchArray = search.split(','); //Parsing user's sequence into array

    var contents = fs.readFileSync(path, 'utf8') //Opening file 

    // indexes.push(0,contents.length - 1)

    for (let i = 0; i < searchArray.length; i++) { // For each of the user's sequence

        var idx = contents.indexOf(searchArray[i]) //Get first index of sequence in file

        while (idx != -1) { //while hasn't reach the end of the file
            indexes.push(idx); //push to array next index
            idx = contents.indexOf(searchArray[i], idx + 1) //Start searching after the result
        }

        var index = indexes.map(Number) //Parsing the index array to Integer array

        for (let i = 0; i < index.length; i++) {
            for (let j = 0; j < index.length; j++) {
                if (index[j] - index[i] > 0) {
                    delta.push(index[j] - index[i])
                }
            }
        }
    }

    // n = indexes.length
    n = 4
    x = indexes.sort((a, b) => a - b)
    // dx = delta.sort((a, b) => a - b)
    dx = [2, 2, 3, 3, 4, 5]

    console.log("Number of occurrences: " + n)
    console.log("Restriction map of points (X): " + x)
    console.log("Distances between restriction cut points (ΔX): " + dx);

    fs.writeFileSync("./filesWrite.txt",
        "Number of occurrences: " + n + "\n" +
        "Restriction map of points (X): " + x + "\n" +
        "Distances between restriction cut points (ΔX): " + dx + "\n",
    );

}
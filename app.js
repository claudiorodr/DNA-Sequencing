const express = require('express')
var fs = require('fs')
const upload = require('express-fileupload')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`))

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html")) //Getting HTML from file

app.post('/', function (req, res) { //When posting from this route, from the form
    var filename = req.files.file.name //Uploaded filename
    var path = './files/' + filename //Move file to local server path
    var search = req.body.text.replace(/ /g, '') //Getting sequence inserted
    
    req.files.file.mv(path, function (err) { //Moving file to specified local path
          if (err) {
              res.send(err)
          }
          else {
              readDNA(path, search) //if successfully completed start reading file
              const file = `${__dirname}/filesWrite.txt`;
            //   res.download(file); // Set disposition and send it.
          }
      })
})

function readDNA(path,search) {

    var delta = [] //Array used to store Delta X values
    var indexes = [] //Array used to store indexes values
    var searchArray = search.split(','); //Parsing user's sequence into array
    
    fs.readFile(path, 'utf8', function (err, contents) { //Opening file 

        // indexes.push(0,contents.length - 1)
        
        for (let i = 0; i < searchArray.length; i++) { // For each of the user's sequence
            
            var idx = contents.indexOf(searchArray[i]) //Get first index of sequence in file
            
            while (idx != -1) {  //while hasn't reach the end of the file
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
        console.log("Number of occurrences: " + indexes.length)
        console.log("Restriction map of points (X): " + indexes.sort((a, b) => a - b))
        console.log("Distances between restriction cut points (ΔX): " + delta.sort((a, b) => a - b));

        // fs.writeFile("./filesWrite.txt", 
        //     "Número de ocorrências: " + indexes.length + "\n" +
        //     "Indices das ocorrencias: " + indexes.sort((a, b) => a - b) + "\n" +
        //     "Delta X de cada corte no genoma: " + delta.sort((a, b) => a - b) + "\n"
        // , function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // }); 
    });

}
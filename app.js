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
    var search = req.body.text //Getting sequence inserted
    
    req.files.file.mv(path, function (err) { //Moving file to specified local path
          if (err) {
              res.send(err)
          }
          else {
              readDNA(path, search) //if successfully completed start reading file
          }
      })
})

function readDNA(path,search) {
    fs.readFile(path, 'utf8', function (err, contents) { //Opening file 
        
        var delta = [] //Array used to store Delta X values
        var indexes = [] //Array used to store indexes values

        var searchArray = search.split(','); //Parsing user's sequence into array
        
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
        console.log("Número de ocorrências: " + indexes.length)
        console.log("Indices das ocorrencias: " + indexes.sort((a, b) => a - b))
        console.log("Delta X de cada corte no genoma: " + delta.sort((a, b) => a - b));
        
    });
}
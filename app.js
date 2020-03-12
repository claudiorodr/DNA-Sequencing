const express = require('express')
var fs = require('fs')
const upload = require('express-fileupload')
const app = express()
const port = 3000


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
        
        var indices = []
        var idx = contents.indexOf(search)
        
        while (idx != -1) {
            indices.push(idx);
            idx = contents.indexOf(search, idx + 1)
        }
        
        console.log("Número de ocorrências: " + indices.length)
        console.log("Indices das ocorrencias: " + indices)
        var b = indices.map(Number)
        
        var delta = []
        
        for (let i = 0; i < b.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (b[j] - b[i] > 0) {
                    delta.push(b[j] - b[i])
                }
            }
        }

        console.log("Delta X de cada corte no genoma: " + delta.sort((a, b) => a - b));
        
    });
}
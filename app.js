const http      = require('http');
const player    = require('./player');
const express   = require("express");
const app       = express();
const fs        = require('fs');
const files     ={
    index: 'index.html',
};

app.use(express.static(`${__dirname}/`));

let visitors = 0;
http.createServer(function(request,response){
    response.end('index.html');
    console.log(visitors);
    visitors+=0;
    console.log(__dirname);
    setInterval(console.log, 1000, "work");
}).listen(3000, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
    console.log(player.namesing);
});

app.get('/',function(request, response){
    response.write('<head><meta charset="UTF-8"></head>');
    response.end("Кіндер");
});
app.get('/player',function (request, response) {
    fs.readFile(files.index, function (error, data) {
        response.end(data);
        console.log(data);
    })
});
app.get('/strong',function(request, response) {
    response.end("Kinderino ");
});

app.listen(3000,'127.0.0.2');
fs.appendFileSync("hello.txt", "Привет ми ми ми!");


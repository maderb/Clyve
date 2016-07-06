var express = require('express');
var bodyParser = require('body-parser');

var app=express();
app.set('port',3000);

app.set('view engine','jade');

app.use(bodyParser.json());

app.get('/clyve',function(req,res){
	console.log('GET Request Recieved');
	res.sendFile('public/index.html',{root:__dirname});
});

app.post('/clyve',function(req,res){
	console.log('Connection Request:\nUsername:'+ req.body.username +'\nPassword:' + req.body.userpw);
	res.setHeader('Content-Type','text/plain');
	res.end('VERIFIED');
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );});
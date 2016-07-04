express = require('express');

app=express();
app.set('port',3000);

app.set('view engine','jade');

app.get('/clyve',function(req,res){
	console.log('GET Request Recieved');
	res.sendfile('public/index.html',{root:__dirname});
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );});


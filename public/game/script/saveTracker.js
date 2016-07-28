var fs=require('fs');

//converts saved file from text to saved gamestate
exports.parseFile = function(filename){
	fs.stat(filename,function(error,stats){
		fs.open(filename,"r",function(error,fd){
			var buffer=new Buffer(stats.size);
			
			fs.read(fd,buffer,0,buffer.length,null,function(error,bytesRead,buffer){
				var data = buffer.toString("utf8",0,buffer.length);
				
				console.log(data);
				fs.close(fd);
			});
		});
	});	
	return filename;
}

//saves file in specified format to denote gamestate
exports.saveFile = function(filename){
	fs.stat(filename,function(error,stats){
		fs.open(filename,"w",function(error,fd){
			//open the file to write
		});
	});	
	return filename;
}
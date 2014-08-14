var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
	if(request.url === '/') {
		response.writeHead(200);
		fs.readFile('index.html', function(err, data) {
			response.end(data);
		});
	}
	else if(request.url.indexOf('/assets') === 0) {
		response.writeHead(200);
		fs.readFile(request.url.substring(1), function(err, data) {
			response.end(data);
		});
		//response.end(request.url);
	}
	else {
		response.writeHead(404);
		response.end('404 Get outta here');
	}
}).listen(8080);
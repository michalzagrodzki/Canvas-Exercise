
// Simple server for testing purpose
// start: node simpleserver
// access in browser: localhost:8000

var http = require('http'),
    fs = require('fs');


fs.readFile('vrtkl.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
});


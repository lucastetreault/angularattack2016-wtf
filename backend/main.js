var express = require('express');
var https = require('https');
var fs = require('fs');

   var hskey = fs.readFileSync('angularattack-key.pem');
   var hscert = fs.readFileSync('angularattack-cert.pem');

   var options = {
        key: hskey,
        cert: hscert
   };


var app = express();

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });

    app.param('pullRequestId', function (req, res, next, pullRequestId) {
        req.pullRequestId = pullRequestId;
        next();
    });

    app.get("/diff/:pullRequestId", function (req, res) {
        https.get({
            host: 'patch-diff.githubusercontent.com',
            path: '/raw/angular/angular/pull/' + req.pullRequestId + '.diff'
        }, function(response) {
            console.log(`Got response: ${response.statusCode}`);

            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                console.log(body);
                res.end(JSON.stringify({'diff': body}));
            });
        });
    });


https.createServer(options,app).listen(8080);

//    app.listen(8080, function () {
//        console.log('Angular Attack WTF/min listening on port 80!');
//    });

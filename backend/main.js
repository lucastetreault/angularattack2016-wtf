var express = require('express');
var https = require('https');
var app = express();
var querystring = require('querystring');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.param('pullRequestId', function(req, res, next, pullRequestId) {
    req.pullRequestId = pullRequestId;
    next();
});

app.param('accessToken', function(req, res, next, accessToken) {
    req.accessToken = accessToken;
    next();
});

app.get("/diff/:pullRequestId/:accessToken", function(req, res) {
    https.get({
        host: 'patch-diff.githubusercontent.com',
        path: '/raw/angular/angular/pull/' + req.pullRequestId + '.diff?access_token=' + req.accessToken
    }, function(response) {
        console.log(`Got response: ${response.statusCode}`);

        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            console.log(body);
            res.end(JSON.stringify({
                'diff': body
            }));
        });
    });
});

app.param('code', function(req, res, next, code) {
    req.code = code;
    next();
});

app.get("/getAuthToken/:code", function(req, res) {
    var clientId = '9b4410e16f2ebd31a513';
    var clientSecret = '49f3f5adb5df06b46e27e65ecd6076b72df61aea';

    var options = {
        hostname: 'github.com',
        port: 443,
        path: '/login/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + '&code=' + req.code,
        method: 'GET'
    };

    var req = https.request(options, function(response) {
        console.log("statusCode: ", response.statusCode);
        console.log("headers: ", response.headers);

        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            res.end(JSON.stringify(querystring.parse(body)));
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
});

app.listen(8080, function() {
    console.log('Angular Attack WTF/min listening on port 80!');
});
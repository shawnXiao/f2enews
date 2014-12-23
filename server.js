// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require('request');
var mongoose   = require('mongoose');
var News = require('./app/models/news');
var Twitts = require('./app/models/twitts');
mongoose.connect('mongodb://127.0.0.1:27017/f2enews');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function (req, res, next) {
    console.log('Sth is happening');
    next();
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/news')
.get(function (req, res) {
    News.find(function (err, news) {
        if (err) {
            res.send(err);
        }
        res.json(news);
    })
})

router.route('/news/start/:start')
.get(function (req, res) {
    News.find()
    .sort({_id: -1})
    .skip(req.params.start || 0)
    .limit(30)
    .exec(function (err, news) {
        if (err) {
            res.send(err);
        }
        res.json(news);
    })
})

router.route('/oauth/github/:code')
.get(function (req, res) {
    var code = req.params.code;
    var oauth = {
        client_id: '',
        client_secret: '',
        code: code
    };
    request.post({
        url: 'https://github.com/login/oauth/access_token',
        headers: {
            Accept: 'application/json'
        },
        form: oauth
    }, function (e, r, body) {
        var accessBody = JSON.parse(body);
        if (accessBody.access_token) {
            request.get({
                url: 'https://api.github.com/user?access_token=' + accessBody.access_token,
                headers: {
                    'User-Agent': 'F2E News'
                }
            }, function (e, r, body) {
                res.json(JSON.parse(body));
            });
        }
    });
})

router.route('/twitts/start/:start')
.get(function (req, res) {
    Twitts.find()
    .sort({_id: -1})
    .skip(req.params.start || 0)
    .limit(30)
    .exec(function (err, twitts) {
        if (err) {
            res.send(err);
        }
        res.json(twitts);
    })
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

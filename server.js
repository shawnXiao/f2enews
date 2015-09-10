// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var url = require('url');
var request = require('request');
var mongoose   = require('mongoose');
var querystring = require('querystring');
var News = require('./app/models/news');
var Twitts = require('./app/models/twitts');
var Classics = require('./app/models/classics');
var config = require('./config');
var crypto = require('crypto');
var marked = require("marked");
var fs = require("fs");
var path = require("path");

mongoose.connect('mongodb://127.0.0.1:27017/f2enews');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
});

router.route('/classics')
.get(function (req, res) {
    Classics.find(function (err, news) {
        if (err) {
            res.send(err);
        }
        res.json(news);
    })
});

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
});

router.route('/oauth/github/:code')
.get(function (req, res) {
    var code = req.params.code;
    var oauth = config.github;

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
});

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
});

// more routes for our API will happen here
router.route('/oauth/weixin')
.get(function (req, res) {
    var reqObj = url.parse(req.url, true);
    var params = reqObj['query'];

    var signature = params.signature;
    var timestamp = params.timestamp;
    var echoStr = params.echostr;
    var nonce = params.nonce;

    var token = "campus";
    var temptArray = [token, timestamp, nonce];
    temptArray.sort();

    var temptStr = temptArray.join('');
    var shasum = crypto.createHash('sha1');
    shasum.update(temptStr);
    var shaResult = shasum.digest('hex');


    if (shaResult === signature) {
        res.send(echoStr);
    } else {
        console.log('not weixin server!')
    }
});

var access_token = "";
var weixin_ticket = "";

router.route('/token/weixin')
.get(function (req, res) {
    getWeixinToken(function () {
        res.json({
            "access_token": access_token
        })
    })
});

router.route('/token/weixin/jssignature')
.get(function (req, res) {
    var reqObj = url.parse(req.url, true);
    var params = reqObj['query'];
    var timestamp = params.timestamp;
    var noncestr = params.nonce;
    var signUrl = params.signurl;
    var force = params.force;

    if (force) {
        weixin_ticket = "";
    }

    if (weixin_ticket) {
        res.json({
            signature: getWeixinJSSignature(noncestr, timestamp, signUrl)
        });
    } else {
        getWeixinTicket(function () {
            res.json({
                signature: getWeixinJSSignature(noncestr, timestamp, signUrl)
            });
        });
    }
});

var weibo_access_token = "";
router.route('/oauth/weibo')
.get(function (req, res) {
    var oauth = config.weibo;
    var reqObj = url.parse(req.url, true);
    var params = reqObj['query'];
    oauth.code = params.code;
    oauth.redirect_uri = "http://f2enews.com/api/oauth/weibo";
    request.post({
        url: 'https://api.weibo.com/oauth2/access_token',
        form: oauth
    }, function (e, r, body) {
        res.json(JSON.parse(body))
    });
});

router.route('/send/weibo')
.get(function (req, res) {
    var reqObj = url.parse(req.url, true);
    var params = reqObj['query'];
    var signature = reqObj['signature'];
    if (signature !== config.signature) {
        res.json({
            "error": "Why you want to use this api? tell me now"
        })
        return;
    }

    var content = decodeURIComponent(params.content);
    var href = decodeURIComponent(params.href);

    request.post({
        url: 'https://api.weibo.com/2/statuses/update.json',
        form: {
            access_token: weibo_access_token,
            status: content + " " + href
        }
    }, function (e, r, body) {
        res.json(body)
    });

});

router.route('/send/weibod')
.get(function (req, res) {
    request.post({
        url: 'https://api.weibo.com/2/statuses/update.json',
        form: {
            access_token: weibo_access_token,
            status: '逛微博同时想偶尔看看前端技术？关注我吧！我将不定时自动更新微博，发送一些质量较高的前端文章。求各位大大带，求粉，求转发 @JS小组 @w3ctech @前端快爆 @淘宝UED @雄熊枭'
        }
    }, function (e, r, body) {
        res.json(body)
    });

});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


app.get("/article/:title", function (req, res) {
    var title = req.params.title + ".md";
    var filePath = path.join(__dirname + '/public', "articles", title);

    var content;
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, "utf-8");
    } else {
        content = "404";
    }

    res.send(marked(content));
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function getWeixinTicket(callback) {
    getWeixinToken(function () {

        request.get({
            url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi"
        }, function (e, r, body) {
            var result = JSON.parse(body);
            var expires_in = result.expires_in;

            weixin_ticket = result.ticket;

            setTimeout(function () {
                weixin_ticket = "";
            }, expires_in * 1000);

            if (callback) {
                callback.call(this);
            }

            return  weixin_ticket;
        });

    });
}

function getWeixinToken(callback) {
    var oauth = config.weixin;

    if (access_token) {
        if (callback) {
            callback.call(this);
        }
        return access_token;
    } else {

        request.get({
            url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + oauth.appid + "&secret=" + oauth.secret
        }, function (e, r, body) {
            var result = JSON.parse(body);
            var expires_in = result.expires_in;

            access_token = result.access_token;
            setTimeout(function () {
                access_token = "";
            }, expires_in * 1000);

            if (callback) {
                callback.call(this);
            }

            return access_token;
        });
    }
}

function getWeixinJSSignature(noncestr, timestamp, signUrl) {
    var temptArray = ["noncestr=" + noncestr, "jsapi_ticket=" + weixin_ticket, "timestamp=" + timestamp, "url=" + signUrl];
    temptArray.sort();
    var temptStr = temptArray.join("&")
    var shasum = crypto.createHash('sha1');
    shasum.update(temptStr);
    var shaResult = shasum.digest('hex');

    console.log("access_token:", access_token);
    console.log("weixin_ticket:", weixin_ticket);
    console.log("temptStr:", temptStr);
    console.log("shaResult:", shaResult);

    return shaResult;
}

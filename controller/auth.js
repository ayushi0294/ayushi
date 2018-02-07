var crypto = require('crypto');
function makeHeader() {
    return [].join.call(arguments, ', ')
}

function makeHeaderRegex() {
    return new RegExp('^' + makeHeader.apply(null, arguments) + '$')
}

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}

exports.auth_user = function(req, res, callback) {
    var user = 'test'
    var realm = 'Private'
    var pass = 'testing'
    var nonce = 'WpcHS2/TBAA=dffcc0dbd5f96d49a5477166649b7c0ae3866a93'
    var nonceCount = '00000001'
    var qop = 'auth'
    var algorithm = 'MD5-sess'
    var clientNonce='asdf'
    var opaque='ayushi'
    if (req.headers.authorization) {

  
        console.log('--------------',req.headers.authorization);
        var cnonce = /cnonce="(.*?)"/.exec(req.headers.authorization)[1]
        console.log("fcydh",cnonce);
        var uri = /uri="(.*?)"/.exec(req.headers.authorization)[1]
        console.log("hsth",uri);
        var u_response = /response="(.*?)"/.exec(req.headers.authorization)[1]
        console.log("hqrt",u_response);
        //console.log();

        var ha0=md5(user + ':' + realm + ':' + pass);
        console.log("astrh",ha0);
        var ha1 = md5(md5(user + ':' + realm + ':' + pass) + ':' + nonce + ':' + cnonce)
        console.log("th",ha1);
        //var ha2 = md5('GET'+':'+uri)

        var ha2 = md5(req.method+':'+uri)
        console.log("thh",ha2);
        var response = md5(ha1 + ':' + nonce + ':' + nonceCount + ':' + cnonce + ':' + qop + ':' + ha2)
        console.log("hwth",response);

        if (response == u_response) {
            callback(false,true);
        }
        else {
            callback(true,false);
        }

    } else {
        callback(true,false);

    }

}

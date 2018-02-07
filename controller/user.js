var crypto = require('crypto');

var UserModel = require('../models/User');
// console.log(UserModel);
var encrypt_password = function (pwd, fn) {
    var hash = crypto.createHash('sha256').update(pwd).digest('hex');
    fn(null, hash);
}
exports.create = function (req, res) {
    if (req.method == 'POST') {

        var password = req.body.password;
        console.log("hygyu", password)
        var name = req.body.name;
        console.log("yyyyyyyyyy", name)
        var email = req.body.email
        console.log("tres", email)
        // if (password) {
        encrypt_password(password, function (err, data) {
            if (err) {
                console.log("err", err)
            }
            else {
                password = data;
                console.log("dcngfc", password)
                var user = {}
                user['name'] = req.body.name
                user['email'] = req.body.email
                user['password'] = password

                UserModel.findOne({ email: req.body.email }, function (err, data) {
                    if (data == null) {
                        UserModel.create(user, function (err, user) {
                            if (err) return res.status(500).send("There was a problem registering the user`.");
                            else {

                                res.send(user)
                            }


                        });

                    }
                    else {
                        res.send("user already exists");
                    }
                });
            }

        });
        // }
        // else{
        //     res.send("parameter missing");
        // }
    }
}

exports.login = function (req, res) {

    if (req.method == 'POST') {
        var email = req.body.email;
        var password = req.body.password;

        console.log("kp", password)

        encrypt_password(password, function (err, data) {
            if (err) {
                console.log("err", err)
            }
            else {
                password = data;
                console.log(password)
                UserModel.findOne({ email: req.body.email, password: password }, function (err, user) {
                    if (err) {
                        res.status(500).send('Error on the server.');
                    }


                    else {
                        console.log("user",user)
                        if (user != null) {

                            res.json({ "msg": "login successfully" })
                        }
                        else {
                            res.send({ "msg": "user is not valid" })
                        }
                    }

                });
            }
        });
    }


    else if (req.method == 'GET') {
        console.log("juhcxiasjc");
        UserModel.findById(req.userId, { password: 0 }, function (err, user) {
            if (err) {
                return res.status(500).send("There was a problem finding the user.");
            }
            else if (user == null) {
                return res.status(404).send("No user found.");
            }
            else {
                console.log("user", user)
                res.status(200).send(user);
            }
        });

    }

}

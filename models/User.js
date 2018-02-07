var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    name:
        {
            type: String
        },
    email:
        {
            type: String
        },
   
    password: {
        type: String
    },
  

},{ collection: 'User' });
var User = mongoose.model('User', UserSchema);
module.exports = User;
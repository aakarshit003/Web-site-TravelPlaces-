var mongoose = require("mongoose");
var plm = require("passport-local-mongoose"); 
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});
UserSchema.plugin(plm);
module.exports = mongoose.model("User",UserSchema);
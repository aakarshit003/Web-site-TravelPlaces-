var express = require("Express");
var app = express();
app.get("/",function(req,res){
    res.send("Hello");
})
app.listen(8080);
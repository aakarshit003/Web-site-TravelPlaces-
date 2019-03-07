 
var express = require("express");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/travel_database', {useNewUrlParser:true});
var bodyparser  = require("body-parser");
var ls = require("passport-local");
var User = require("./models/signin");
var passport = require("passport");
var app = express();
app.use(bodyparser.urlencoded({encoded:true}));
app.use(require("express-session")({
secret: "Virat is the best",
resave:false,
saveUninitialized:false
}));
	
app.use(passport.initialize());	
app.use(passport.session()); 
passport.use(new ls(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/home',isLoggedIn,function(req,res){
	res.render("loggedmain.ejs");
});
app.get("/about",function(req,res){
	res.render("about.ejs");
});
app.get("/contact",function(req,res){
	res.render("contacts.ejs");
});
app.get("/ny",function(req,res){
	res.render("ny.ejs");
});
app.get("/india",function(req,res){
	res.render("india.ejs");
});
app.get("/london",function(req,res){
	res.render("london.ejs");
});
app.get("/bali",function(req,res){
	res.render("bali.ejs");
});
app.get("/england",function(req,res){
	res.render("england.ejs");
});
app.get("/switzerland",function(req,res){
	res.render("switzerland.ejs");
});
app.get("/japan",function(req,res){
	res.render("japan.ejs");
});
app.get("/china",function(req,res){
	res.render("china.ejs");
});
app.get("/srilanka",function(req,res){
	res.render("srilanka.ejs");
});
app.get("/signup",function(req,res){
	res.render("signin.ejs");
});
app.get("/login",function(req,res){
	res.render("login.ejs");
});
app.get("/new",function(req,res){
	res.send("Hello after login");
});
app.post("/new",function(req,res)
{
	User.register(new User({username:req.body.username}),req.body.password,function(err,usr)
	{
		if(err)
		{
			console.log(Error);
			return res.render("/signup");
		}
		else
		{
			passport.authenticate("local")(req,res,function()
			{
				res.redirect("/home1");
			});
		}
	});
});
app.get("/home1",function(req,res){
	res.render("loggedmain.ejs");
});
app.get("/old",function(req,res){
	res.render("mainpage.ejs");
});
app.post("/old", passport.authenticate("local",{
	successRedirect: "/home1",
	failureRedirect: "/login"
}),function(req,res){
});
app.get("/logout",function(req,res){
	req.logOut();
	res.redirect("/home");
});
app.get("*",function(req,res){
	res.send("Sorry u entered the wrong URL :/ :/ :/");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}
app.listen(3000,function(req,res){
	console.log("Server has started");
});
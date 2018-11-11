const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	const isLoggedIn = req.get("Cookie");
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: req.session.isLoggedIn
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("5be6dc02acfe2821a87bd7e2")
		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			//use save to wait until session is save to the database, then redirect
			res.session.save(() => {
				res.redirect("/");
			});
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/");
	});
};

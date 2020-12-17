const db = require('../models/index');

const userController = {
	postUser(req, res, next) {
		// console.log(req.body)
		const params = [
			req.body.email,
			req.body.password,
		];
		const queryString = `INSERT INTO Users (Email, Password) VALUES ($1, $2) RETURNING *;`;

		db.query(queryString, params)
			.then((data) => {
				return next();
			})
			.catch((err) => {
				console.log('error in postuser');
				return next(err);
			});
	},

	getUser(req, res, next) {
		//test this  ?
		const queryString = `SELECT * FROM Users WHERE Username = $1;`;
		const params = [req.params.Username];
		const password = req.body.password;

		db.query(queryString, params)
			.then((data) => {
				//res.locals will be what returns from db NOT input
				// console.log('data', data.rows)
				res.locals.users = data.rows;
				res.locals.params = params;
				res.locals.params.push(password);
				console.log('helloooo', res.locals.params);
				return next();
			})
			.catch((err) => {
				console.log('error in getUSer ', err);
				return next(err);
			});
	},
};

module.exports = userController;

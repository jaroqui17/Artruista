const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const storyRouter = require('./routes/router.js');
const userRouter = require('./routes/userRouter.js');
const storiesRouter = require('./routes/storyRouter.js');
const authRouter = require('./routes/router.js');
// requiring passport and passport google oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
// initializing passport and session
app.use(passport.initialize());
app.use(passport.session());
// const bcrypt = require('bcrypt');

// routes
app.use(cors());
app.use('/story', storyRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api', storiesRouter);

const PORT = process.env.PORT || 5000;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	done(null, 10);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			// once the user clicks on one of the accounts they are redirected to this link
			callbackURL: '/auth/google/redirect',
		},
		(accessToken, refreshToken, profile, done) => {
			//   console.log(profile)
			// console.log('passport function')

			//save user profile to users table
			let userName = profile.displayName;
			let pass = profile.id;
			// console.log(userName, pass)
			//check if pass(unique id exist), if it does do nothing.
			//if unique id doesn't insert one in db
			let sqlQuery = "select * from users where password='" + pass + "'";
			db.query(sqlQuery, (err, response) => {
				if (err) {
					console.log(err.stack);
				} else {
					if (response.rows.length === 0) {
						//user doesn't exist, insert in db.
						let createUser = `insert into Users (Username,Password) values ('${userName}', '${pass}') returning *`;
						db.query(createUser, (err, response) => {
							if (err) {
								console.log(err.stack);
							} else {
								// console.log(response)
								//if no err running query, new user should be created
								done(null, response.rows[0]);
								// console.log('USER MADE')
							}
						});
					} else {
						// console.log('UNIQUE USER IS FOUND')
						//if unique pass is found, redirect
						done(null, response.rows[0]);
					}
				}
			});
		}
	)
);

// serve main app
app.get('/', (req, res) => {
	console.log(req);
	res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/encryptme', (req, res) => {
	console.log('req.query: ', req.query.password);
	let saltRounds = 10;
	bcrypt.hash(req.query.password, saltRounds, (err, hash) => {
		res.send({
			before: req.query.password,
			after: hash,
		});
	});
});

// const myHash = hash

app.get('/compareme', (req, res) => {
	const plainTextPass = req.query.password;
	bcrypt.compare(plainTextPass, myHash, (err, result) => {
		res.send(result); //should be true
	});
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = { ...defaultErr, ...err };
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// starting server
app.listen(PORT, (err) => {
	if (err) return console.log(err);
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

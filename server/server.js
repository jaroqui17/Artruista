const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
const userRouter = require('./routes/userRouter.js')
const storyRouter = require('./routes/router.js')
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 5000;

app.use('/story', storyRouter)
app.use('/user', userRouter)


// serve main app
app.get('/', (req, res) => {
	console.log(req);
	const jwtToCheck = req.cookies.token || undefined
	console.log('secret', secret)
	// const jwtToCheck = req.cookies.token ? //what if this is undefined
	jwt.verify(jwtToCheck, secret, (err, decoded) => {
		if (decoded) res.json({authenticated : true})
		else 	res.sendFile(path.resolve(__dirname, './index.html'));
	})
	// res.sendFile(path.resolve(__dirname, './index.html'));
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
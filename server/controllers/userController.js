const db  = require('../models/index');
const bcrypt = require('bcrypt')

const userController = {
	// postUser(req, res, next) {
	// 	// console.log(req.body)
	// 	const params = [
	// 		req.body.email,
	// 		req.body.password,
	// 	];
	// 	const queryString = `INSERT INTO Users (Email, Password) VALUES ($1, $2) RETURNING *;`;

  postUser (req, res, next) {
    console.log('postuser works')
    console.log(req.body)
    // console.log(req.body)
    let saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {

    console.log('hash', hash) // works
     const params = [req.body.firstName, req.body.lastName, req.body.email, hash,];
    const queryString =  `INSERT INTO Users (FirstName, LastName, Email, Password) VALUES ($1, $2, $3, $4) RETURNING *;`

      db.query(queryString, params)
      .then((data) => {
        console.log('1')
        return next()
      })
      .catch((err)=> {
        console.log(params)
        console.log('error in postuser')
        return next(err)
      })
      })
      // console.log('console.log', hash)
    
  },

  getUser (req, res, next) {
    //test this  ?
    const queryString = `SELECT * FROM Users WHERE Email = $1;` //email instead
    console.log('reqbody', req.body) //not here 
    const params = [req.body.email]
    console.log('params', params)
    const password = req.body.password //works
    db.query(queryString, params)
      .then((data) => {
        //data from db
        res.locals.users = data.rows;
        //email inputted
        res.locals.params = params
        //push password as well
        res.locals.params.push(password)
        console.log('helloooo', res.locals.params)
        return next();
      })
      .catch((err) => {
        console.log('error in getUSer ', err)
        return next(err)
      })
  },
}

module.exports = userController;

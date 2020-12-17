const db  = require('../models/index');
const bcrypt = require('bcrypt')

const userController = {

  postUser (req, res, next) {
    // console.log(req.body)
    let saltRounds = 10;
    bcrypt.hash(req.body.Password, saltRounds, (err, hash) => {

    console.log('hash', hash) // works
     const params = [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Username, hash, req.body.Location];
    const queryString =  `INSERT INTO Users (FirstName, LastName, Email, Username, Password, Location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

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
    const params = [req.params.Email] //meail
    const password = req.body.password
    db.query(queryString, params)
      .then((data) => {
  
        // console.log(data, params)
        //res.locals will be what returns from db NOT input
        res.locals.users = data.rows;
        res.locals.params = params
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
const db  = require('../models/index');

const userController = {

  postUser (req, res, next) {
    // console.log(req.body)
    const params = [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Username, req.body.Password, req.body.Location];
    const queryString =  `INSERT INTO Users (FirstName, LastName, Email, Username, Password, Location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

    db.query(queryString, params)
      .then((data) => {
        return next()
      })
      .catch((err)=> {
        console.log('error in postuser')
        return next(err)
      })
  },

  getUser (req, res, next) {
    //test this  ?
    const queryString = `SELECT * FROM Users WHERE Username = $1;` //email instead
    const params = [req.params.Username] //meail
    const password = req.body.password

    db.query(queryString, params)
      .then((data) => {
  
        // console.log(data, params)
        //res.locals will be what returns from db NOT input
        // console.log('data', data.rows)
        res.locals.users = data.rows;
             console.log('res', res.locals.users)
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
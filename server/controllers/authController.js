const db  = require('../models/index');
const bcrypt = require('bcrypt')


const authController = {
  verifyUser (req, res, next) {
  console.log('in verify user')

  //get request
  const params = [req.body.email]
  const password = req.body.password
  const queryString =  `SELECT * FROM Users WHERE Email = $1`
  db.query(queryString, params)
    .then (data => {
      console.log('within get request in auth controller')
      console.log(data.rows[0]["password"])
      const pass = data.rows[0]["password"]
      bcrypt.compare(password, pass, (err, result) => {
    		if (result) { 
          console.log('bcrypt worked compared')
         return next()
        }
        else next(err) //redirec to signup
    	})    

    })
    }
 }


 module.exports = authController

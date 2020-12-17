const db  = require('../models/index');
const bcrypt = require('bcrypt')


const authController = {
  verifyUser (req, res, next) {
  console.log('in verify user')
    const pass = res.locals.users[0].password // encypted
    const inputpass = res.locals.params[1]
    //bcrypt
    	bcrypt.compare(inputpass, pass, (err, result) => {
    		if (result) { 
          console.log('bcrypt worked compared')
          next()
        }
        else next(err) //redirec to signup
    	})    

  }
 }

 module.exports = authController
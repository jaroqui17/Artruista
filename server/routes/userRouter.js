const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController.js');
//import auth
const authController = require('../controllers/authController.js')
const cookieController = require('../controllers/cookieController.js')

//sign in NOT SIGN UP YOU IDIOT post
router.post('/verify', authController.verifyUser, (req, res) => {
  console.log('howdy howdy')
  return res.status(200).json({ message: 'hello'})
} )

//sign up DONE
router.post('/', Controller.postUser, (req, res) => {
	res.redirect(`http://localhost:8080/#/main`);
});
//sign in -> gets user from db to check matching psswords
router.get('/', Controller.getUser, authController.verifyUser, cookieController.setCookie, (req, res) => {
  return res.status(200).json({authenticated : true})
})

module.exports = router;

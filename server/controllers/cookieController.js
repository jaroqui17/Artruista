const jwt = require('jsonwebtoken')
const db  = require('../models/index');
const express = require('express')

const Controller = {
  
  setCookie (res,req, next) {

  //   const payload = {
  //     id: user._id,
  //     name: user.username,
  //   };
  //   // create a token, it expires in 1 day, you can change it to anytime
  //   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
  //     expiresIn: '1d',
  //   });
  //   // send this token in the front end
  //   res.json({ token });
  // } catch (err) {
  //   return res.status(500).json({
  //     message: err.message,
  //   });
  
    // console.log('jon is cool')
    // const secret = req.body.password
    // console.log('secret', secret)
    // const userObj = {
    //     name: req.body.email,
    //     authenticated: 'true'
    // }

    // const token = jwt.sign(userObj, secret, {
    //   expiresIn: 5000,
    //   httpOnly: false
    // })
    // console.log('token', token) // works
    // req.cookie('token', token)
    // return next()
  }

};

module.exports = Controller
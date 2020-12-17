const jwt = require('jsonwebtoken')
const db  = require('../models/index');
const express = require('express')

const Controller = {
  
  setCookie (res,req, next) {
    const secret = res.body.password
    const userObj = {
        name: res.params.Email,
        authenticated: 'true'
    }

    const token = jwt.sign(userObj, secret)
    console.log('token', token) // works
    req.cookie('token', token)
    return next()
  }

};

module.exports = Controller
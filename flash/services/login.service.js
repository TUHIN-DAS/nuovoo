const express = require('express');
const router = express.Router();
const config = require('config.json');
const jwt = require('jsonwebtoken');
const key = require('config.json');
const DBUtils = require('../utils/dbutils.js');

const REGISTER_USER_QUERY = (name,email,password) => "insert into users(name,email,password) values('" + name + "','" + email + "','" + password + "')";
const SIGNIN_QUERY = (email,password) => "select * from users where email = '" + email + "' and password = '" + password + "'";
const USER_EXISTS_QUERY = (email) => "select * from USERS where email = '" + email + "'";

router.post('/login', login);
router.post('/register', register);

module.exports = router;

function addUser( data,req, res, next)
{
	if(data.length > 0) {
			res.json({ success : false, message: 'Email already exists with another account.' });
			return;
	}
  let dbconn = new DBUtils();
	let query = REGISTER_USER_QUERY(req.body.name ,req.body.email ,req.body.password);
  dbconn.executeQueryAsync(query,req,res,next);
}

function register( req, res, next)
{
	let dbconn = new DBUtils();
	let query = USER_EXISTS_QUERY(req.body.email);
    dbconn.executeQueryAsync(query,req,res,next,addUser);
}

function login( req, res, next)
{
	let dbconn = new DBUtils();
	let query = SIGNIN_QUERY(req.body.email,req.body.password);
	dbconn.executeQueryAsync(query,req,res,next,authenticate);
}

function authenticate(data,req, res, next) {
	if(data.length == 0) {
			res.json({ success : false, message: 'Login email or password incorrect.' });
			return;
	}
    const token = jwt.sign({ sub: data[0].id }, key.secret);
    const { password, ...userWithoutPassword } = data;
  	res.json({
        token,
		success : true
    });
}

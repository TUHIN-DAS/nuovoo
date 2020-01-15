
const DBUtils = require('../utils/dbutils.js');

const express = require('express');
const router = express.Router();
const async = require('async');

const SCHEMA_QUERY = "DESCRIBE ";
const GET_TABLES_QUERY = "SHOW TABLES";

const getSchema = ( req, res, next) =>
{
  let dbconn = new DBUtils(req.body.conf);
  let query = SCHEMA_QUERY + req.body.table;
  dbconn.executeQuery(query,res,next);
}

const getTables = ( req, res, next) =>
{
  let dbconn = new DBUtils(req.body.conf);
  dbconn.executeQuery(GET_TABLES_QUERY,res,next);
}

const validateDS =  ( req, res, next) =>
{
  let dbconn = new DBUtils(req.body);
  dbconn.validateConnection(res,next);
}

router.post('/schema', getSchema);
router.post('/tables', getTables);
router.post('/validateds', validateDS);

module.exports = router;

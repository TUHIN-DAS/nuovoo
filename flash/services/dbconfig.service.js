/*
DB config handler
*/
const express = require('express');
const router = express.Router();
const fs = require('fs');
const async = require('async');

const FILE_EXT = ".dbc";
const FILE_PATH = "db_configs/";

class DBConfigHandler {

  addConfig(req, res, next) {
    let dbConf = req.body;
    let id = new Date().getTime() + "_" + parseInt(Math.random(9)*100000);
    dbConf.id = id;
    fs.writeFile(FILE_PATH + id + FILE_EXT, JSON.stringify(dbConf), (err) => {
      if (err) next(err);
      res.json({"success" : true});
    });
  }

  deleteConfig(req, res, next) {
    fs.unlink(FILE_PATH + req.body.id + FILE_EXT, (err) => {
      if (err) next(err);
      res.json({"success" : true});
    });
  }

  getConfigs(req, res, next)
  {
    let dbConfList = [];
    fs.readdir(FILE_PATH, (err, files) => {
      if (err) next(err);
      async.eachSeries(files, (filename, cb) => {
        fs.readFile(FILE_PATH + filename, "utf8", (err, data) => {
           dbConfList.push(JSON.parse(data));
           cb(err);
        });
      },
      (err) => {
        res.json(dbConfList);
      });
    });
  }

  updateConfig(req, res, next)
  {
    let dbConf = req.body;
    fs.writeFile(FILE_PATH + dbConf.id + FILE_EXT, JSON.stringify(dbConf), function (err) {
      if (err) throw err;
      if (err) next(err);
      res.json({"success" : true});
    });
  }

}

class DBConfig {

  constructor()
  {
    this.user = "";
    this.password = "";
    this.database = "";
    this.host = "";
    this.port = "";
    this.application = "";
    this.configName = "";
    this.id = "";
  }
}

//module.exports = DBConfigHandler;
const dbConfHandler = new DBConfigHandler();

router.post('/add', dbConfHandler.addConfig);
router.delete('/delete', dbConfHandler.deleteConfig);
router.post('/update', dbConfHandler.updateConfig);
router.get('/',dbConfHandler.getConfigs);

module.exports = router;

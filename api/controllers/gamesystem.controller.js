'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var gamesystemService = require('../services/gamesystem.service');

const { Gamesystems } = require('../models'); // Sequelize
////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[GameSystem Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getGameSystems(req, res) {
  try {
    console.log("gamesystems..."); 
    console.log(Gamesystems);
    Gamesystems.findAll({
      /*include: [{ model: orderstatus }]
      include: [{ all: true, nested: true }]*/
    })
    .then((consoles) => { console.log(consoles);
      res.status(200).send(consoles);
      //utils.writeJson(res, consoles); }, (error) => {
      res.status(500).send(error); });
    } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
  }
}

function addGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mygamesystem = req.body;
    console.log("gamesystems ... " + mygamesystem);

      return Gamesystems
        .create({
          name: mygamesystem.name,
          description: mygamesystem.description,

        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mygamesystem) => {
          res.status(201).send(mygamesystem);

        })
        .catch((error) => res.status(400).send(error));


  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addGameSystem.name, error, res);
  }
}

function getGameSystembyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;

    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);

    Gamesystems.findById(id)
    .then(mygamesystem => {
    console.log(mygamesystem);
    res.status(200).send(mygamesystem);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystembyId.name, error, res);
  }
}

function createGameSystem(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mygamesystem = req.body;
    console.log("gamesystems ... " + mygamesystem);

      return Gamesystems
        .create({
          name: mygamesystem.name,
          description: mygamesystem.description,

        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mygamesystem) => {
          res.status(201).send(mygamesystem);

        })
        .catch((error) => res.status(400).send(error));


  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
  }

  /*try {
    // Receiving parameters
    var params = req.body;

    // Call to service
    var result = gamesystemService.createGameSystem(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.status(201).json(result);
    } else {
      res.status(409).json(messageHelper.buildMessage(result.error));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
  }*/
}

function updateGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;

    console.log("params : " + id);
    var myupdategamesystem = req.body;
    console.log("update gamesystems ... " + myupdategamesystem.name + " " + myupdategamesystem.descripcion);


    Gamesystems.findById(id)
      .then(mygamesystem => {
        console.log("Result of findById: " + mygamesystem);
        if (!mygamesystem) {
          res.status(401).send(({}));

        }
        return mygamesystem
          .update({
            name: myupdategamesystem.name,
            description: myupdategamesystem.description
           })
          .then(() => res.status(200).send(mygamesystem) )
          .catch(error => res.status(403).send(mygamesystem));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
  }

}


function deleteGameSystem(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;

  Gamesystems
    .findById(id)
    .then(mygamesystem => {
      console.log("Result of findById: " + mygamesystem);
      if (!mygamesystem) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mygamesystem
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });
}

module.exports = {
  getGameSystems,
  getGameSystembyId,
  createGameSystem,
  updateGameSystem,
  deleteGameSystem,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}

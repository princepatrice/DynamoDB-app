const express =  require("express");
const musicController = require("../controllers/musicController");

const routes = express.Router();


//CRUD REST API

routes.route("/musics")
.get(musicController.getAll)
.post(musicController.checkKeys,musicController.addOne);

routes.route("/musics/by/keys")
.post(musicController.checkKeys,musicController.getOne)
.patch(musicController.checkKeys,musicController.updateOne)
.put(musicController.checkKeys,musicController.updateOne)
.delete(musicController.checkKeys,musicController.deleteOne);

module.exports = routes
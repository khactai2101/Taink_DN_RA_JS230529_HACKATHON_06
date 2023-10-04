const controllers = require("../controllers/taskControllers");
const express = require("express");
const router = express.Router();

router.route("/").post(controllers.createTask);
router.route("/").get(controllers.getTask);
router.route("/:id").put(controllers.updateTask);
router.route("/:id").get(controllers.getOneTask);
router.route("/:id").delete(controllers.deleteTask);

module.exports = router;

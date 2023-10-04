const controllers = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.route("/").get(controllers.getAllCategory);
router.route("/:id").get(controllers.getOneCategory);
router.route("/").post(controllers.createCategory);

module.exports = router;

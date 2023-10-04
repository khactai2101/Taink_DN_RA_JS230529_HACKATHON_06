const controllers = require("../controllers/questionController");
const express = require("express");
const router = express.Router();

router.route("/test").get(controllers.getQuestionWithParams);

router.route("/:id").get(controllers.getOneQuestion);
router.route("/").get(controllers.getAllQuestion);
router.route("/:id/answers").get(controllers.getOneQuestionForAllAnswer);
router.route("/").post(controllers.addQuestion);

module.exports = router;

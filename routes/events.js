const express = require("express");
const router = express.Router();
const controllers = require("../controllers/eventController");
const { errorWrapper } = require("../handlers/errorHandlers");

router.route("/").post(errorWrapper(controllers.createEvent));

router
  .route("/:id")
  .get(controllers.getEvent)
  .put(controllers.updateEvent)
  .post(errorWrapper(controllers.updateOrCreate))
  .delete(errorWrapper(controllers.deleteOne));

router.route("/spider/:id").get(controllers.getSpiderEvents);

module.exports = router;

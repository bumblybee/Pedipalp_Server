const express = require("express");
const router = express.Router();
const controllers = require("../controllers/eventController");
const { errorWrapper } = require("../handlers/errorHandlers");
router.route("/").post(errorWrapper(controllers.createOne));

router
  .route("/:id")
  .get(controllers.getEvents)
  .put(controllers.updateOne)
  .post(errorWrapper(controllers.updateOrCreate))
  .delete(errorWrapper(controllers.deleteOne));

module.exports = router;

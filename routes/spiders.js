const express = require("express");
const router = express.Router();
const controllers = require("../controllers/spiderController");
const { errorWrapper } = require("../handlers/errorHandlers");
router
  .route("/")
  .get(controllers.getMany)
  .post(errorWrapper(controllers.createOne));
// router.route("/").get(controllers.getMany).post(controllers.createOne);

router
  .route("/:id")
  .get(controllers.getSpider)
  .put(controllers.updateOne)
  .post(errorWrapper(controllers.updateOrCreate))
  .delete(errorWrapper(controllers.deleteOne));

module.exports = router;

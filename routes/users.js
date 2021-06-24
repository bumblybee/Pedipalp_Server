var express = require("express");
var router = express.Router();
const { isAuth } = require("../middleware/isAuth");

const {
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const { errorWrapper } = require("../handlers/errorHandlers");

router.get("/current", isAuth, errorWrapper(getCurrentUser));
router.post("/signup", errorWrapper(signupUser));
router.post("/login", errorWrapper(loginUser));
router.post("/logout", logoutUser);

module.exports = router;

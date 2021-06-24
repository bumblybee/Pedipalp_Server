const authService = require("../services/authService");
const { COOKIE_CONFIG } = require("../config/cookieConfig");

exports.getCurrentUser = async (req, res) => {
  const { id } = req.token.data;

  const user = await authService.getUser(id);

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ error: "user.unauthorized" });
  }
};

exports.signupUser = async (req, res) => {
  const { jwt, userData } = await authService.signupUser(req.body);

  if (userData) {
    res.cookie("_pedi", jwt, COOKIE_CONFIG);

    res.status(201).json(userData);
  } else {
    return;
  }
};

exports.loginUser = async (req, res) => {
  const { jwt, userData } = await authService.loginUser(req.body);

  res.cookie("_pedi", jwt, COOKIE_CONFIG);

  if (userData) {
    res.status(200).json({ data: userData });
  } else {
    res.json(error);
  }
};

exports.logoutUser = async (req, res) => {
  res
    .clearCookie("_pedi", COOKIE_CONFIG)
    .json({ message: "Successfully logged out" });
};

const User = require("../db").User;
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { CustomError } = require("../handlers/errorHandlers");

exports.generateJWT = (user) => {
  const data = {
    id: user.id,
    username: user.username,
  };

  const secret = Buffer.from(process.env.JWT_SECRET, "base64");
  const expiration = "5h";

  return jwt.sign({ data }, secret, {
    expiresIn: expiration,
  });
};

exports.getUser = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: {
      exclude: ["password", "isDeleted", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  if (user) {
    return user;
  } else {
    throw new CustomError("user.unauthorized", "userError", 401);
  }
};

exports.signupUser = async (user) => {
  const { username, password } = user;

  const existingCredentials = await User.findOne({
    where: { username },
  });

  if (existingCredentials) {
    throw new CustomError("auth.existingCredentials", "SignupError", 401);
  } else {
    const hash = await argon2.hash(password);

    const newUser = {
      ...user,
      password: hash,
    };

    // Store user in db
    const createdUser = await User.create(newUser);

    if (createdUser) {
      const jwt = this.generateJWT(createdUser);

      return { jwt, userData: username };
    } else {
      throw new CustomError("auth.failedSignup", "SignupError", 401);
    }
  }
};

exports.loginUser = async (user) => {
  const { username, password } = user;

  const userRecord = await User.findOne({ where: { username } });

  if (!userRecord) {
    // Handle login failure

    throw new CustomError("auth.invalidCredentials", "LoginError", 401);
  }

  const correctPassword = await argon2.verify(userRecord.password, password);

  // Handle incorrect password
  if (!correctPassword) {
    throw new CustomError("auth.invalidCredentials", "LoginError", 401);
  }

  const jwt = this.generateJWT(userRecord);

  return {
    jwt,
    userData: userRecord.username,
  };
};

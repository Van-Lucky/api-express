const users = require("../models/users") || [];
const Response = require("../responesbody/Respones.js");

const getAllUserController = (req, res) => {
  return res.send(users);
};

const createNewUserController = (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  // const fs = require("fs");
  // fs.writeFileSync("src/models/users2.json", JSON.stringify(users));
  res.send(newUser);
};

const getUserByIdController = (req, res) => {
  try {
    const { params } = req;
    console.log({ params });
    const { id } = undefined;
    const foundUsers = users.filter((user) => {
      return user.id == id;
    });
    console.log({ foundUsers });
    new Response(res).setResponse(foundUsers[0]).send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

module.exports = {
  getAllUserController,
  createNewUserController,
  getUserByIdController,
};

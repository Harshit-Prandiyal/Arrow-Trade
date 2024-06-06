const User = require("../models/user");
async function handleLogin(req, res) {
  // res.send("Login page");
  // req.body has email and password fields
  // check if a user exists with that email and password
  // if yes, return that user
  // if no, return an error
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", isAuthenticated: false });
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res
      .status(400)
      .json({ error: "Invalid credentials", isAuthenticated: false });
  }
  return res
    .status(200)
    .json({ message: "User logged in successfully", isAuthenticated: true , user });
}
async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  // console.log(req.body);
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", isAuthenticated: false });
  }
  const result = await User.create({ name, email, password });
  if (!result) {
    return res
      .status(400)
      .json({ error: "User already exists", isAuthenticated: false });
  }
  return res
    .status(201)
    .json({ message: "User registered successfully", isAuthenticated: true , user: result});
}
module.exports = { handleRegister, handleLogin };

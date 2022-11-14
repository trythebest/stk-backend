import express from "express";
import User from "../models/Users.js";

const router = express.Router();

router.post("/new", (req, res) => {
  // POST method for user verification
  try {
    const { currentUser } = req.body; // Getting the current user from frontEnd

    User.findOne({ email: currentUser.email }, (err, foundUser) => {
      // Checking if the user is already present by email
      if (err) throw err;
      if (foundUser) {
        // if user is already present returning a message to client
        return res
          .status(200)
          .send({ message: "User Exists - Login Successful" });
      } else {
        // if not present already, adding the user to the User database and returning a message to client
        const user = new User(currentUser);
        user.save();
        return res.status(200).send({ message: "Login Successful" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Login not successful" });
  }
});

router.get("/", async (req, res) => {
  //GET request for listing out all the users
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Unable to get Users" });
  }
});

export default router;
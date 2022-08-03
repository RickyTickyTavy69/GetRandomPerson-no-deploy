import { Router } from "express";
import Users from "../models/usersModel.js";
const router = Router();

router.post("/", async (req, res) => {
  let user = req.body.username;
  console.log("on server, user @bannUser", user);
  try {
    let usersArr = await Users.find();
    if (usersArr) {
      console.log("usersArr @bannUser", usersArr);

      let usersArr1 = usersArr[0].usersArray.map((userInArr) => {
        if (user === userInArr) {
          return `${user}banned`;
        } else {
          return userInArr;
        }
      });

      console.log("new usersArr", usersArr1);
      await Users.findOneAndRemove();
      let newUsers = new Users({ usersArray: usersArr1 });
      await newUsers.save();
      res
        .status(200)
        .json({ message: "users have been updated", peoples: usersArr1 });
    }
  } catch (error) {
    console.log("error getting usersArr", error);
  }
});

export default router;

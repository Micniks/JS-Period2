import express from "express";
import userFacade from "../facades/user";
import { ApiError } from "../errors/apiError";
import {myBasicAuth} from "../middlewares/myBasicAuth";

const router = express.Router();

router.post('/', async function (req, res, next) {
  try{
    let newUser = req.body;
    newUser.role = "user";  //Even if a hacker tried to "sneak" in his own role, this is what you get
    const status = await userFacade.addUser(newUser)
    res.json({status})
  } catch (err){
    next(err);
  }
})

// I put basic auth here, so only users can retrive data
const useAuthentication = !process.env["SKIP_AUTHENTICATION"];
if (useAuthentication) {
  router.use(myBasicAuth);
}

// Used because the dummy-data password is not hashed initially
userFacade.hashDatabasePasswords()

router.get('/:userName', async function (req, res, next) {
  try {
  const user_Name = req.params.userName;
  const user = await userFacade.getUser(user_Name);
  const { name, userName } = user;
  const userDTO = { name, userName }
  res.json(userDTO);
  } catch(err){
    next(err)
  }
});

router.get('/', async function (req, res, next) {
  try {
    const users = await userFacade.getAllUsers();
    const usersDTO = users.map((user) => { 
      const { name, userName } = user;
      return {name,userName}
    })
    res.json(usersDTO);
  } catch (err) {
    next(err)
  }
});


router.delete('/:userName', async function (req: any, res, next) {
  try {

    const role = req.role;
    if (useAuthentication && role != "admin") {
      throw new ApiError("Not Authorized", 403)
    }

    const user_name = req.params.userName;
    const status = await userFacade.deleteUser(user_name)
    res.json({ status })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
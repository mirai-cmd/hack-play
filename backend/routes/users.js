const express =require('express');
const router = express.Router();
const {registerController,loginController, getUsers} = require('../controllers/UserController')

router.get("/users",getUsers)
router.post("/register",registerController);
router.post("/login",loginController);

module.exports = router;
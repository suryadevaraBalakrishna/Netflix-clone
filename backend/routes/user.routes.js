const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

module.exports=server=>{
    router.post("/register",userController.createUser);
    router.post("/login",userController.loginUser);
    router.post("/profile",userController.viewProfile);
    router.post("/update",userController.updateProfile);
    router.post("/change-password",userController.changePassword);
    router.post("/reset-password",userController.resetPassword);
    router.post("/forgot-password",userController.forgotPassword);

    server.use("/api/website/user",router);
}
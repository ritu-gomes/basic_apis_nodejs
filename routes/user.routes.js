const express = require('express');
const { allUsers, registration, deleteUser, changeUserInfo, singleUser } = require('../controller/user.controller');
const router = express.Router();

router.get("/", allUsers);
router.get("/:id", singleUser);
router.post("/", registration);
router.delete("/:id", deleteUser);
router.put('/:id', changeUserInfo);

module.exports = router;
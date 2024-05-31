const express = require('express');
const { allUsers, registration, deleteUser } = require('../controller/user.controller');
const router = express.Router();

router.get("/", allUsers);
router.post("/", registration);
router.delete("/:id", deleteUser);

module.exports = router;
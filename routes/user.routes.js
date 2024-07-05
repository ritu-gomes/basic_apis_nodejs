const express = require('express');
const { allUsers, registration, deleteUser, changeUserInfo, singleUser } = require('../controller/user.controller');
const router = express.Router();
const validate = require('../middlewares/validate');
const {registerSchema, updateSchema} = require('../schema/user.schema');

router.get("/", allUsers);
router.get("/:id", singleUser);
router.post("/", validate(registerSchema) ,registration);
router.delete("/:id", deleteUser);
router.put('/:id', validate(updateSchema), changeUserInfo);

module.exports = router;
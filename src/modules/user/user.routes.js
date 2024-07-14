// const express = require('express');
const path = require('path');
// const router = express.Router();
const controller = require('./user.controller');
const validate = require(path.join(process.cwd(), "src/modules/core/middlewares/validate.js"));
const {registerSchema, updateSchema} = require('./user.schema');
const auth = require('./user-authentication.middleware');

module.exports = app => {
    app.route("/api/users")
        .get(auth, controller.allUsers)
        .post(validate(registerSchema) ,controller.registration);
    app.route("/api/users/:id")
        .get(controller.singleUser)
        .delete(controller.deleteUser)
        .put(controller.changeUserInfo);
    app.route("/api/login")
        .post(controller.login);
};

// router.get("/api/users", controller.allUsers);
// router.get("/api/users/:id", controller.singleUser);
// router.post("/api/users", validate(registerSchema) ,controller.registration);
// router.delete("/api/users/:id", controller.deleteUser);
// router.put('/api/users/:id', validate(updateSchema), controller.changeUserInfo);

// module.exports = router;
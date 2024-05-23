const express = require('express');
const router = express.Router();
const {userSchema} = require('../schema/userSchema');

const userData = [
    {
        "id": "1",
        "name": "Sara",
        "email_or_phone": "sara123@gmail.com",
        "password": "laal33&"
    },
    {
        "id": "2",
        "name": "elsa",
        "email_or_phone": "elsa55@gmail.com",
        "password": "kfg33&"
    }
];

// const validateUser = async (user) => {
//         try {
//             await userSchema.validate(user);
//             return null;
//         } catch (error) {
//             return error.errors[0];
//         }
// }


router.get("/", (req, res) => {
    res.status(201).send(userData);
}); 

router.post("/", async (req, res) => {
    const { id, name, email_or_phone, password } = req.body;

    try {
        await userSchema.validate({name, email_or_phone});

        const newUser = {
            id: id,
            name: name,
            email_or_phone: email_or_phone,
            password: password
        };

        userData.push(newUser);
        res.status(201).send(userData);

    } catch (error) {
        return res.status(400).send(error.errors[0]);
    };

});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const theUser = userData.find(user => user.id == id);
    // console.log(theUser);
    if(!theUser){
        return res.status(404).send("user not found");
    };
    const userIndex = userData.indexOf(theUser);
    // console.log(userIndex);
    userData.splice(userIndex,1);
    res.send(userData);
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, email_or_phone, password } = req.body;

    const theUser = userData.find(user => user.id == id);

    if (!theUser) {
        return res.status(404).send("user not found");
    };

    if(name){theUser.name = name};
    if(email_or_phone){theUser.email_or_phone = email_or_phone};
    if(password){theUser.password = password};
    // theUser = { ...theUser, name, email_or_phone, password};

    res.status(201).send(userData);
});
 
module.exports = router;
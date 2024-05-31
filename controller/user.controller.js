const { validateUserRegistration } = require('../validations/user.validate');
const { registerSchema } = require('../schema/user.schema');

// const { User } = require('../models/dbmodel');
// const { where } = require('sequelize');


const usersData = [
    {
        id: 1,
        username: "cody",
        email: "codydaboss@gmail.com",
        password: "codtheboss345"
    }
];

function allUsers(req, res ) {
    res.status(200).send(usersData);
}

module.exports.allUsers = allUsers;

async function registration(req, res) {
    const { username, email, password, confirm_password } = req.body;

    try {
        const error = await validateUserRegistration({username, email, password, confirm_password});

        // console.log(error);

        if(error) return res.status(400).send(error);

        // const user = await User.findOne({
        //     where: {
        //         email
        //     }
        // });

        const newUser = {
            id: usersData.length+1,
            username: username,
            email: email,
            password: password
        }
        usersData.push(newUser);

        res.status(201).send(usersData);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.registration = registration;

function deleteUser(req, res) {
    const id = req.params.id;
    const theUser = usersData.find(user => user.id == id);
    // console.log(theUser);
    if(!theUser){
        return res.status(404).send("user not found");
    };
    const userIndex = usersData.indexOf(theUser);
    // console.log(userIndex);
    usersData.splice(userIndex,1);
    res.status(201).send(usersData);
};

module.exports.deleteUser = deleteUser;

// router.put("/:id", (req, res) => {
//     const id = req.params.id;
//     const { name, email_or_phone, password } = req.body;

//     const theUser = userData.find(user => user.id == id);

//     if (!theUser) {
//         return res.status(404).send("user not found");
//     };

//     if(name){theUser.name = name};
//     if(email_or_phone){theUser.email_or_phone = email_or_phone};
//     if(password){theUser.password = password};
//     // theUser = { ...theUser, name, email_or_phone, password};

//     res.status(201).send(userData);
// });
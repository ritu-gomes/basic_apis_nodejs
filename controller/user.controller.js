const { validateUserRegistration, validateUserInfoChange } = require('../validations/user.validate');
const { registerSchema } = require('../schema/user.schema');

const { User } = require('../models/dbmodel');
const { where } = require('sequelize');


// const usersData = [
    // {
    //     id: 1,
    //     username: "cody",
    //     email: "codydaboss@gmail.com",
    //     password: "codtheboss345"
    // }
// ];

async function allUsers(req, res ) {
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
    res.status(200).send(users);
}

module.exports.allUsers = allUsers;

const singleUser = async (req, res) => {
    const id = req.params.id;
    const theUser = await User.findOne({
        where: {
            id
        }
    });
    if(!theUser){
        return res.status(404).send("user not found");
    };
    res.status(200).send(theUser);

};

module.exports.singleUser = singleUser;

async function registration(req, res) {
    const { username, email, password, confirm_password } = req.body;

    try {
        const error = await validateUserRegistration({username, email, password, confirm_password});

        if(error) return res.status(400).send(error);

        const userExistence = await User.findOne({
            where: {
                email
            }
        });
        
        if(userExistence) return res.status(400).send('already registered with this email');

        const newUser = await User.create({
            username,
            email,
            password
        });

        // usersData.push(newUser);
        res.status(201).send(newUser);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.registration = registration;

async function deleteUser(req, res) {
    const id = req.params.id;
    const theUser = User.findOne({
        where: {
            id
        }
    });
    // console.log(theUser);
    if(!theUser){
        return res.status(404).send("user not found");
    };
    
    await User.destroy({
        where: {
            id
        }
    });
    res.status(200).send(`userId: ${id} has been deleted suceessfully`);
};

module.exports.deleteUser = deleteUser;

async function changeUserInfo(req, res ) {

    const id = req.params.id;
    const { username, email } = req.body;

    try {
        const error = await validateUserInfoChange({username, email});

        if(error) return res.status(400).send(error);

        // const user = await User.findOne({
        //     where: {
        //         email
        //     }
        // });

        const theUser = User.findOne({
            where: {
                id
            }
        });

        if (!theUser) {
            return res.status(404).send("user not found");
        };

        if(username){await User.update(
            {username},
            {
                where: {
                    id
                }
            }
        )};
        if(email){await User.update(
            {email},
            {
                where: {
                    id
                }
            }
        )};
        res.status(201).send(theUser);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.changeUserInfo = changeUserInfo;
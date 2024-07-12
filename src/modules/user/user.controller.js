const  User = require('./user.model');
const UserType = require('./user-type.model');
const { where } = require('sequelize');

async function allUsers(req, res ) {
    const users = await User.findAll({
        include: [{
            model: UserType,
            as: "user_types"
        }]
    });
    
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
    const { username, email, password, user_type_id } = req.body;

    try {
        const userExistence = await User.findOne({
            where: {
                email
            }
        });
        
        if(userExistence) return res.status(400).send('already registered with this email');

        const newUser = await User.create({
            username,
            email,
            password,
            user_type_id
        });

        res.status(201).send(newUser);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.registration = registration;

async function deleteUser(req, res) {
    const id = req.params.id;
    const theUser = await User.findOne({
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
        const theUser = User.findOne({
            where: {
                id
            }
        });

        if (!theUser) {
            return res.status(404).send("user not found");
        };

        if(username) { User.update(
            {username},
            {
                where:{
                    id
                }
            }
        );
        }
        if(email) {
            User.update(
                {email},
                {where: {
                    id
                }}
            );
        }
        res.status(201).send(theUser);

    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }

};

module.exports.changeUserInfo = changeUserInfo;
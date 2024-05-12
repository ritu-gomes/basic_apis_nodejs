const express = require('express');
const app = express();

app.use(express.json());
const userData = [
    {
        "id": "1",
        "name": "Sara",
        "email_or_phone": "sara123@gmail.com",
        "password": "laal33&"
    }
]

app.get("/users", (req, res) => {
    res.status(200).send(userData);
}); 

app.post("/users", (req, res) => {
    const { id, name, email_or_phone, password } = req.body;
    // console.log(req.body.email_or_phone);
    const newUser = {
        id: id,
        name: name,
        email_or_phone: email_or_phone,
        password: password
    };

    userData.push(newUser);
    res.status(201).send(userData);
});

app.delete("/users/:id", (req, res) => {
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

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email_or_phone, password } = req.body;

    const theUser = userData.find(user => user.id == id);

    if (!theUser) {
        return res.status(404).send("user not found");
    };

    // console.log(req.body.email_or_phone);
    if(name){theUser.name = name};
    if(email_or_phone){theUser.email_or_phone = email_or_phone};
    if(password){theUser.password = password};
    // theUser = { ...theUser, name, email_or_phone, password};

    res.status(201).send(userData);
});



app.listen(3000, () => {

    console.log("yes I'm listening");
});
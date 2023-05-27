const express = require('express');
const User =require('./users');
const router = express.Router();
function contact(){

    router.get('/contacts', async (req, res) =>{
        const contact = User.FindAll({})
        res.response(contact);
    });

};

export default  contact;
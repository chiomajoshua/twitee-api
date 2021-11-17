const UserModel = require('../model/user.model');
const crypto = require('crypto');
const winston = require('../../common/config/winston');

exports.insert = (req, res) => {
    try{
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    UserModel.findByEmail(req.body.email)
    .then((user) => {
    if(!user[0]){
         UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
    }else{
        console.log(user);
        console.log('entered else tag');
         res.status(409).send({response: "User Already Exists"});
    }})
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.list = (req, res) => {
    try{
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.getById = (req, res) => {
    try{
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.getByEmail = (req, res) => {
    try{
    UserModel.findByEmail(req.params.email)
        .then((result) => {
            res.status(200).send(result);
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.patchById = (req, res) => {
    try{
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.removeById = (req, res) => {
    try{
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};
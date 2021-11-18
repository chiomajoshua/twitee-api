const PostModel = require('../model/post.model');
const ActivityModel = require('../model/activity.model');
const winston = require('../../common/config/winston');

exports.insert = (req, res) => {
    try{
        req.body.ownerId = req.jwt.userId;
        PostModel.createPost(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.getByPostId = (req, res) => {
    try{
        PostModel.findById(req.params.postId)
        .then((result) => {
            res.status(200).send(result);
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

exports.getByOwnerId = (req, res) => {
    try{
        PostModel.findByOwnerId(req.jwt.userId)
        .then((result) => {
            res.status(200).send(result);
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};


exports.removePost = (req, res) => {
    try{       
        PostModel.removePost(req.params.postId, req.jwt.userId)
        .then((result)=>{
            res.status(204).send({});
        });
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};

//#region Activity
exports.insertActivity = (req, res) => {
    try{
        req.body.userId = req.jwt.userId;
        ActivityModel.createActivity(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        })
    }
    catch(e){
        winston.error(e);
        res.status(500).send({response: "An Error Occured. Please Contact Administrator"});
    }
};


//#endregion
const mongoose = require('../../common/service/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    ownerId:{
        type: String,
        required : true
    },
    tweet:{
        type: String,
        required : true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

postSchema.findById = function (cb) {
    return this.model('Post').find({id: this.id}, cb);
};

const Post = mongoose.model('Post', postSchema);


exports.findByOwnerId = (authorId) => {
    return Post.find({ownerId: authorId})
};

exports.findById = (id) => {
    return Post.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createPost = (postData) => {
        const post = new Post(postData);
        return post.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Post.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, posts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            })
    });
};

exports.patchPost = (id, postData) => {
    return Post.findOneAndUpdate({
        _id: id
    }, postData);
};

exports.removePost = (postId, authorId) => {
    console.log(postId);
    console.log(authorId);
    return new Promise((resolve, reject) => {
        Post.deleteOne({_id: postId, ownerId: authorId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
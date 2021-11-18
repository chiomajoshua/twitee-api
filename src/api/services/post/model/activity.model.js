const mongoose = require('../../common/service/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    postId:{
        type: String,
        required : true
    },
    activity:{
        type: String,
        required : true
    },
    comment:{
        type: String,
    },
    userId:{
        type: String,
        required : true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

activitySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
activitySchema.set('toJSON', {
    virtuals: true
});

activitySchema.findById = function (cb) {
    return this.model('Activity').find({id: this.id}, cb);
};

const Activity = mongoose.model('Activity', activitySchema);


exports.findByPostId = (postId) => {
    return Activity.find({postId: postId})
};

exports.createActivity = (postData) => {
        const activity = new Activity(postData);
        return activity.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Activity.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, activity) {
                if (err) {
                    reject(err);
                } else {
                    resolve(activity);
                }
            })
    });
};
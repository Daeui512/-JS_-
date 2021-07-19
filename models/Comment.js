var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId, ref:'post', required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'user', require:true},
    parentComment:{type:mongoose.Schema.Types.ObjectId, ref:'comment'},
    text:{type:String, required:[true, '댓글을 입력해주세요!']},
    isDeleted:{type:Boolean},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

commentSchema.virtual('childComments')
    .get(function () { 
        return this._chidComments;
    })
    .set(function (value) {  
        this._chidComments=value;
    });

var Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
const Post = require('../models/PostModel');

module.exports = {

    index(req, res) {
        Post.find({category: req.params.category}).sort({ date: -1 })
            .exec((err, posts) => {
                if (err) console.error(err);
                res.status(200).json({ posts });
            });
    },
}
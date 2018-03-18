const Post = require('../models/PostModel');
const Helper = require('../helpers');
const fs = require('fs');

module.exports = {

    index(req, res) {
        const limit = 3;
        Post.find()
            .sort({date: -1})
            .limit(limit)
            .skip( limit * req.params.page)
            .exec((err, posts) => {
            if (err) console.error(err);
            res.status(200).json({posts});
        });
    },

    show(req, res) {
        Post.findOne({slug: req.params.slug}).exec((err, post) => {
            if (err) console.error(err);
            res.status(200).json({post});
        })
    },

    create(req, res) {
        let post = new Post(req.body),
            body = req.body.body;
        post.body = Helper.base64ToFileStorer(body, 'public/images');
        post.tags = Helper.tagsHandler(req.body.tags);
        post.save((err) => {
            if (err) console.error(err);
            Post.find().sort({date: -1}).exec((err, posts) => {
                if (err) console.error(err);
                res.status(200).json({posts});
            });
        })
    },

    update(req, res) {
        let body = req.body.body,
            imgRegExp = /<img src[^>]+/g,
            imagesToUnlink = [];
        Post.findOne({_id: req.body._id}).exec((err, post) => {
            if (err) {
                console.error(err);
            }
            // compare the post's body with the new body, looking for image changes.
            const originalImages = post.body.match(imgRegExp);
            if (originalImages !== null) {
                const newImages = body.match(imgRegExp);
                if (newImages !== null) {
                    imagesToUnlink = originalImages.filter(img => {
                        return newImages.indexOf(img) === -1;
                    });
                } else {
                    imagesToUnlink = originalImages;
                }
                imagesToUnlink.map(img => {
                    let src = __dirname + '/..' + img.slice(10, -1)
                    //console.log(src);
                    fs.stat(src, (err, stat) => {
                        if (err) {
                            console.error(err);
                        }

                        fs.unlink(src, err => {
                            if (err) {
                                console.log(err);
                            }

                        });
                    })
                });
                // If the old body has images, that are not contained in the new body, erase it from the server
            }
            post.body = Helper.base64ToFileStorer(req.body.body, 'public/images');
            post.title = req.body.title;
            post.tags = Helper.tagsHandler(req.body.tags);
            post.category = req.body.category;
            post.save((err) => {
                if (err) console.error(err);
                Post.find().sort({data: -1}).exec((err, posts) => {
                    if (err) console.error(err);
                    res.status(200).json({posts});
                })
            });
        })
    },

    destroy(req, res) {
        let imgRegExp = /<img src[^>]+/g,
            imagesToUnlink = [];
        Post.findOne({_id: req.params.id}).exec((err, post) => {
            if (err) {
                console.error(err);
            }
            imagesToUnlink = post.body.match(imgRegExp);
            if (imagesToUnlink !== null) {
                imagesToUnlink.map(img => {
                    if (img.slice(10, 14) !== 'data') {
                        let src = __dirname + '/..' + img.slice(10, -1);
                        fs.stat(src, (err, stat) => {
                            if (err) {
                                console.error(err);
                            }


                            fs.unlink(src, err => {
                                if (err) {
                                    console.log(err);
                                }

                            });
                        })
                    }
                });
            }
            post.remove( err => {
                if (err) console.error(err);
                Post.find().sort({data: -1}).exec((err, posts) => {
                    if (err) console.error(err);
                    res.status(200).json({posts});
                })
            });
        })
    }
}
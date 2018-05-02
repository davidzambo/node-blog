const Post = require('../models/PostModel');
const Helper = require('../helpers');
const moment = require('moment');
const fs = require('fs');
const NewsLetter = require('./NewsletterController');

module.exports = {

    index(req, res) {
        const limit = 5,
            page = req.query.page || 1,
            category = req.query.category,
            filter = (category === undefined) ? {} : {category: category};


        Post.find(filter)
            .sort({date: -1})
            .exec((err, posts) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                return res.status(200).json({
                    posts: posts.slice( (page - 1 )*limit, (page - 1 ) * limit + limit),
                    count: posts.length,
                    page: page,
                    limit: limit
                });
        });
    },

    show(req, res) {
        Post.findOne({slug: req.params.slug}).exec((err, post) => {
            if (err) return res.status(400)
                .json({err, message: "Az adatbázis nem elérhető!"});
            return res.status(200).json({post});
        })
    },

    create(req, res) {
        let post = new Post(req.body),
            body = req.body.body;
        post.body = Helper.base64ToFileStorer(body, 'public/images');
        post.tags = Helper.tagsHandler(req.body.tags);
        post.save((err) => {
            if (err) return res.status(400).json({err, message: "Hiba a mentés során!"});
            NewsLetter.sendNotification(post);
            Post.find().sort({date: -1}).exec((err, posts) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                return res.status(200).json({posts});
            });
        })
    },

    update(req, res) {
        let body = req.body.body,
            imgRegExp = /<img src[^>]+/g,
            imagesToUnlink = [];
        Post.findOne({_id: req.body._id}).exec((err, post) => {
            if (err) return res.status(400)
                .json({err, message: "Az adatbázis nem elérhető!"});
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
                if (err) return res.status(400).json({err, message: "Hiba a mentés során!"});
                Post.find().sort({data: -1}).exec((err, posts) => {
                    if (err) return res.status(400)
                        .json({err, message: "Az adatbázis nem elérhető!"});
                    return res.status(200).json({posts});
                })
            });
        })
    },

    destroy(req, res) {
        let imgRegExp = /<img src[^>]+/g,
            imagesToUnlink = [];
        Post.findOne({_id: req.body._id}).exec((err, post) => {
            if (err) return res.status(400)
                .json({err, message: "Az adatbázis nem elérhető!"});
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
                if (err) return res.status(400)
                    .json({err, message: "A posztot nem tudtuk törölni!"});

                Post.find().sort({data: -1}).exec((err, posts) => {
                    if (err) return res.status(400)
                        .json({err, message: "Az adatbázis nem elérhető!"});
                    return res.status(200).json({posts});
                })
            });
        })
    },

    archives: {
        listMonths(req, res){
            Post.aggregate([
                {
                    $project: {
                        "year": {"$year": "$date"},
                        "month": {"$month": "$date"}
                    }
                },
                {
                    $group: {
                        _id: null,
                        distinctDate: {
                            "$addToSet": {
                                year: "$year",
                                month: "$month",
                            },
                        },
                    }
                }
            ], (err, result) =>{
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                if (result[0] && result[0].distinctDate) {
                    return res.status(200).json({result: result[0].distinctDate});
                } else {
                    return res.status(200).json({result: []});
                }
            });
        },

        show(req, res) {
            const from = moment().year(req.params.year).month(req.params.month-1).date(1).format(),
                to = moment().year(req.params.year).month(req.params.month).date(1).format(),
                limit = 5,
                page = req.query.page || 1;
            Post.find({date: {$gte: from, $lt: to}}, (err, posts) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                return res.status(200).json({
                    posts: posts.slice( (page - 1 )*limit, (page - 1 ) * limit + limit),
                    count: posts.length,
                    page: page,
                    limit: limit
                })
            })
        }
    }
}
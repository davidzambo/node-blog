module.exports = {

    index(req, res){
        Post.find().sort({ date: -1 }).exec((err, posts) => {
            if (err) console.error(err);
            res.status(200).json({ posts });
        });
    },

    create(req, res){
        let post = new Post(req.body),
            body = req.body.body;
        post.body = base64ToFileStorer(body, 'public/images');
        post.tags = tagsHandler(req.body.tags);
        post.save((err) => {
            if (err) console.error(err);
            Post.find().sort({ date: -1 }).exec((err, posts) => {
                if (err) console.error(err);
                res.status(200).json({ posts });
            });
        })
    },

    update(req, res){
        let body = req.body.body,
            imgRegExp = /<img src[^>]+/g,
            imagesToUnlink = [];
        Post.findOne({ _id: req.body._id }).exec((err, post) => {
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
                    let src = __dirname + '/' + img.slice(10, -1)
                    console.log(src);
                    fs.stat(src, (err, stat) => {
                        if (err) { console.error(err); };

                        fs.unlink(src, err => {
                            if (err) { console.log(err); }

                        });
                    })
                });
                // If the old body has images, that are not contained in the new body, erase it from the server
            }
            post.body = base64ToFileStorer(req.body.body, 'public/images');
            post.title = req.body.title;
            post.tags = tagsHandler(req.body.tags);
            post.category = req.body.category;
            post.save((err) => {
                if (err) console.error(err);
                Post.find().sort({ data: -1 }).exec((err, posts) => {
                    if (err) console.error(err);
                    res.status(200).json({ posts });
                })
            });
        })
    }
}
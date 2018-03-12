const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const base64img = require('base64-img');

// DB setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trd');
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: { type: String, required: true, unique:true },
  slug: { type: String, unique: true, lowercase: true },
  tags: { type: [String], required: true },
  body: { type: String, required: true },
  category: {type: String, required: true},
  date: { type: Date, default: Date.now },
  meta: {
    views: { type: Number, default: 0},
  }
});

const Post = mongoose.model('Post', postSchema);
postSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase().replace(/\s/g, '-');
  next();
});


//helper functions
const nice = (nmb) => {
  return (nmb < 10) ? '0'+nmb : nmb;
}

const randomFilename = () => {
  let filename = new Date().getFullYear().toString().substr(-2) + nice(new Date().getMonth() + 1) + nice(new Date().getDate());
  for (let i = 0; i < 8; i++)
    filename += String.fromCharCode(Math.ceil(Math.random() * 24) + 97);
  return filename;
}


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use('/public', express.static('public'));

app.get('/api/posts', (req, res) => {
  Post.find().sort({date: -1}).exec( (err, posts) => {
   if (err) console.error(err);
   res.status(200).json({posts});
  });
});

/**
 * create a new post
 */
app.post('/api/posts', (req, res) => {
  let post = new Post(req.body),
      body = req.body.body;

  post.body = base64ToFileStorer(body, 'public/images');

  post.tags = tagsHandler(req.body.tags)<

  post.save( (err) => {

    if (err) console.error(err);

    Post.find().sort({ date: -1 }).exec( (err, posts) => {
        if (err) console.error(err);
        res.status(200).json({posts});
    });

  })
});

/**
 * update a post
 */
app.put('/api/posts ', (req, res) => {
  let body = req.body.body,
      imgRegExp = /<img src[^>]+/g,
      imagesToErase = [];
  // seach the original post
  console.log(req.body._id);
  Post.findById(req.body._id).exec((err, post) => {
    if (err) console.error(err);
    // compare the post's body with the new body, looking for image changes.
    const originalImages = post.match(imgRegExp);
    const newImages = body.match(imgRegExp);
    imagesToErase = originalImages.filter(img => {
      return newImages.indexOf(img) === -1;
    });
    // If the old body has images, that are not contained in the new body, erase it from the server

    // store the new body base64 images to the server
    post.body = base64ToFileStorer(body, 'public/images');
    
    post.title = req.body.title;
    
    post.tags = tagsHandler(req.body.tags);
    
    post.category = req.body.category;
    
    post.save( (err) => {
      if (err) console.error(err);

      Post.find().sort({data: -1}).exec( (err, posts) => {
        if (err) console.error(err);
        res.status(200).json({posts});
      })

    });
  })
  // send back the nem list 
})

app.listen(port, () => console.log(`Listening on port ${port}`));


/**
 * 
 * @param {*} body  html string
 * @param {*} destination destination folder
 * Investigate the body, looking for base64 coded images
 * Store them in the given target directory
 * Replace the link in the body
 * Returns the new body
 */
const base64ToFileStorer = (body, destination) => {
  // get all base64 from the post's body
  let base64Images = body.match(/data:image[^"]+/g);

  // store all base64 image and gather the new filenames 
  base64Images.map((img) => {

    body = body.replace(img, base64img.imgSync(img, destination, randomFilename()));

  });

  // return the replaced image body
  return   body;
}
/**
 * 
 * @param {*} tagString 
 * split the fiven string on '+', convert it to lowercase, than 
 * examine all tag to be unique.
 * Retruns the unique tag array;
 */
const tagsHandler = (tagString) => {
  return tagsString.toLowerCase().split('+').reduce((uniqueTags, tag) => {
    if (uniqueTags.indexOf(tag) === -1)
      uniqueTags.push(tag);
    return uniqueTags;
  }, []);
}
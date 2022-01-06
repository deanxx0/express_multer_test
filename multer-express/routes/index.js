var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'public/images/uploads'});

router.post('/uploadFile', upload.single('meme'), (req, res, next) => {
  res.json(req.file);
})

router.post('/uploadFiles', upload.array('meme', 2), (req, res, next) => {
  req.files.forEach(file => {
    const newPath = `public/images/uploads/${Date.now()}_${file.originalname}`;
    fs.rename(file.path, newPath, err => {
      if (err) throw err;
      console.log(`uploaded ${file.originalname}`);
    });
  });
  res.json(req.files);
})

module.exports = router;

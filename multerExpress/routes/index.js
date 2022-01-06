var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'public/images/uploads'})
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('meme'), (req, res, next) => {
  const newPath = `public/images/uploads/${Date.now()}_${req.file.originalname}`;
  fs.rename(req.file.path, newPath, (err) => {
    if(err) throw err;
    res.json('file uploaded!');
  });
  // res.json({
  //   field: req.body, // input type="text" 의 값이 들어온다.
  //   image: req.file // input type="file" name="meme" 의 파일 정보가 들어온다.
  // });
})

router.post('/formsubarray', upload.array('meme2'), (req, res, next) => {
  console.log(req.files);
  const newPath = `public/images/uploads/${Date.now()}_${req.files[0].originalname}`;
  const newPath2 = `public/images/uploads/${Date.now()}_${req.files[1].originalname}`;
  fs.rename(req.files[0].path, newPath, (err) => {
    if(err) throw err;
    // res.json('file 1 uploaded!');
  });
  fs.rename(req.files[1].path, newPath2, (err) => {
    if(err) throw err;
    res.json('file 2 uploaded!');
  });
});

router.post('/formsubfields', upload.fields([
  {name:'meme3', maxCount: 5},
  {name:'meme4', maxCount: 5}
]), async (req, res, next) => {
  console.log(req.files);
  req.files.meme3.forEach(file => {
    const newPath = `public/images/uploads/meme3_${Date.now()}_${file.originalname}`;
    fs.rename(file.path, newPath, (err) => {
      if(err) throw err;
      console.log(`uploaded ${file.originalname}`);
    });
  })
  req.files.meme4.forEach(file => {
    const newPath = `public/images/uploads/meme4_${Date.now()}_${file.originalname}`;
    fs.rename(file.path, newPath, (err) => {
      if(err) throw err;
      console.log(`uploaded ${file.originalname}`);
    });
  })
  res.json('upload complete!');
})

module.exports = router;

const path = require('path');
const rateLimit = require('express-rate-limit');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const limiter = rateLimit({
  max: 150,
  windowMs: 10 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter);

const multerStorage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `meme-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Please upload images with jpeg or png format!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2500000 }
}).single('file');

app.post('/api/meme', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      err.storageErrors.push(err.message);
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

module.exports = app;

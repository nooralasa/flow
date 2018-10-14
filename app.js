var createError = require('http-errors');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

// Google Cloud Translate API
const {Translate} = require('@google-cloud/translate');
const projectId = 'flow-219404';
const translate = new Translate({
  projectId: projectId,
});

var indexRouter = require('./routes/index');
var submitRouter = require('./routes/submit');
var translateRouter = require('./routes/translate');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MULTER CONFIG: to get file photos to temp server storage
var multerConfig = {
  
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function(req, file, next){
      next(null, './public/data/audio');
    },   
      
    //Then give the file a unique name
    filename: function(req, file, next){
      filename = file.fieldname
      fs.readdir('public/data/audio', (err, files) => {
        filename = files.length;
        console.log(file);
        const ext = file.mimetype.split('/')[1];
        next(null, filename + '.'+ext);
      });
    }
  })
};

app.get('/', function(req, res, next) {
  fs.readdir('public/data/text', (err, files) => {
    res.render('index', {numberOfFiles: files.length});
  });
});
app.use('/submit', submitRouter);
app.use('/translate', translateRouter);
app.use('/upload', uploadRouter);

app.post('/translate', function(req,res) {
  fs.readdir('public/data/text', (err, files) => {
    filename = files.length;
    fs.writeFile('public/data/text/'+filename+'.txt', req.body.stanza, function(err) {
      if (err) throw err;

      // Translate
      translate.translate(req.body.stanza, 'en').then(results => {
        const translation = results[0];

        console.log(`Text: ${req.body.stanza}`);
        console.log(`Translation: ${translation}`);
        var param = encodeURIComponent(translation);
        res.redirect('/translate?translation='+param);
      }).catch(err => {
        console.error('ERROR:', err);
      });

      console.log("Saved!");
    });
  });
});

app.post('/saveTranslation', function(req,res) {
  fs.readdir('public/data/translation', (err, files) => {
    filename = files.length;
    fs.writeFile('public/data/translation/'+filename+'.txt', req.body.translation, function(err) {
      if (err) throw err;
      console.log("Saved!");
      res.redirect('upload');
    });
  });
});

app.post('/upload', multer(multerConfig).single('audio'), function(req,res) {
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

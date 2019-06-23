var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var ejs=require('ejs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/testdb');
var Schema = mongoose.Schema;
 
var userDataSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    author: String
  }, {collection: 'user-data'});
  
var UserData = mongoose.model('UserData', userDataSchema);

app.get('/', function(req, res, next) {
    res.render(path.join( '../views/conn.ejs'))
  }); 

app.post('/insert', function(req, res, next) 
{
    var item = 
    {
        title : req.body.t,
        content : req.body.c,
        author : req.body.a
    };
  
    var data = new UserData(item);
    data.save();
  
    res.redirect('/');
});

app.get('/get-data', function(req, res, next) 
{
    UserData.find({}, function(err,log)
    {
        if(err)
        {
            console.log("Error");
        }
        else
        {
            console.log("Total Records Found:"+log.length);
            for(var i=0;i<log.length;i++)
            {
                var did = log[i]._id;
                var dtit = log[i].title;
                var dcon = log[i].content;
                var daut = log[i].author;
                console.log((i+1)+"\t"+did+"\t"+dtit+"\t"+dcon+"\t"+daut);
                res.render('conn.ejs' , {itemw : did , itemww : dtit , itemwww : dcon , itemwwww: daut});
            }
        }
    }); 
   // res.redirect('/');   
});

app.post('/update', function(req, res, next) {
    var id = req.body.ia;
  
    UserData.findById(id, function(err, doc) {
      if (err) {
        console.error('error, no entry found');
      }
      doc.title = req.body.ta;
      doc.content = req.body.ca;
      doc.author = req.body.aa;
      doc.save();
    })
    res.redirect('/');
});

app.post('/delete', function(req, res, next) {
    var id = req.body.iaa;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
  });

var server = app.listen(9999, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

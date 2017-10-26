var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
var mongoDBURI = process.env.MONGODB_URI ||'mongodb://CJV:doritos61@ds125565.mlab.com:25565/heroku_wkfmg3vq';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CS at CSUEB' });
});

router.get('/doit', function(req, res, next) {
    res.render('doit', { title: 'Do it' });
});
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response) {
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of routes
        var Routes = db.collection('Routes');

        //get all Routes
        Routes.find({ }).sort({ name: 1 }).toArray(function (err, docs) {

            if(err) throw err;

            response.render('pages/mongodb', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });

    });//end of connect


});//end XXX.get

module.exports = router;


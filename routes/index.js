/* This is a router file */
/* Here we create a router as a module and export it, so that its available to be used elsewhere */
var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

/* middleware that is specific to this router */
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});


/* GET home page. */
router.get('/', function(req, res) {
	var myArtwork = [];
	var myArtists = [];
	myArtists = appdata.speakers;
	appdata.speakers.forEach(function(item){
		myArtwork = myArtwork.concat(item.artwork);
	});
  res.render('index', { 
  	title: 'Home',
  	 artwork:myArtwork,
  	 artists:myArtists,
  	 page:'home'
  });
});

router.get('/speakers', function(req, res) {
	var myArtwork = [];
	var myArtists = [];
	myArtists = appdata.speakers;
	appdata.speakers.forEach(function(item){
		myArtwork = myArtwork.concat(item.artwork);
	});
  res.render('speakers', { 
  	title: 'Speakers',
  	 artwork:myArtwork,
  	 artists:myArtists,
  	 page:'artistList'
  });
});

router.get('/speakers/:speakerid', function(req, res) {
	var myArtwork = [];
	var myArtists = [];
	appdata.speakers.forEach(function(item){
		if(item.shortname == req.params.speakerid){
			// NB: push alters the array that invoked it(original array)
			myArtists.push(item);// add one or more elements(another array) into an array

			/* concat returns a new array with the original array joined with 
			the array/s or value/s that were provided as arguments */
			myArtwork = myArtwork.concat(item.artwork);
		}
	});
  res.render('speakers', { 
  	title: 'Speakers',
  	 artwork:myArtwork,
  	 artists:myArtists,
  	 page:'artistDetail'
  });
});

/* Export the router */
module.exports = router;

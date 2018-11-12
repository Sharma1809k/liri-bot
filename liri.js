require("dotenv").config();

// fs is a core Node package for reading and writing files
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//grabbing user input variables
var input = process.argv;

var command = input[2];

//grabs movie , artists or song names to put into request
var search = "";
for (i = 3; i < input.length; i++) {
	search = search + " " + input[i];
}
search = search.trim();
if (command === "spotify-this-song") {

	// Default for "The Sign" by Ace of Base.
	if (search === "") {
  		search = "The Sign by Ace of Base"
  	}
// Searching for tracks
spotify.search({ type: 'track', query: search}, function(error, body) {
	
 if (error) {
	return console.log('Error: ' + error);
  }
	var track = body.tracks.items;
	for (var i = 1; i < track.length; i++) {
console.log([i])
	console.log(
	"-----------------------------------------------------------------------" + "\n" +
	"Song Title: " + track[i].name + "\n" +
	"Artist: " + track[i].artists[0].name + "\n" +
	"Album: " + track[i].album.name + "\n" + 
	"Preview Link: " + track[i].preview_url + "\n" +
	"-----------------------------------------------------------------------")
	fs.appendFile("log.txt",
	"-----------------------------------------------------------------------" + "\n" +
	"Song Title: " + track[i].name + "\n" +
	"Artist: " + track[i].artists[0].name + "\n" +
	"Album: " + track[i].album.name + "\n" + 
	"Preview Link: " + track[i].preview_url + "\n" +
	"-----------------------------------------------------------------------" ,function(err) {
		if (err) {
		  console.log(err);}
		;}
	) ;}
	
})
}
//Searching for movies
if (command === "movie-this") {
	if (search === "") {
		search = "Mr. Nobody";
	}
	request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
		if (!error && response.statusCode === 200) {
			
			console.log("-----------------------------------------------------------------------" + "\n" +
				"Movie Title: " + JSON.parse(body).Title + "\n" +
				"Year: " + JSON.parse(body).Year + "\n" +
				"IMBD Rating: " + JSON.parse(body).imdbRating + "\n" +
				"Rotten Tamatos: " + JSON.parse(body).Ratings[0].Value + "\n" +
				"Country: " + JSON.parse(body).Country + "\n" +
				"Language: " + JSON.parse(body).Language + "\n" +
				"Movie Plot: " + JSON.parse(body).Plot + "\n" +
				"Actors: " + JSON.parse(body).Actors + "\n" +
				"-----------------------------------------------------------------------" )
				fs.appendFile("log.txt", 
				"-----------------------------------------------------------------------" + "\n" +
				"Movie Title: " + JSON.parse(body).Title + "\n" +
				"Year: " + JSON.parse(body).Year + "\n" +
				"IMBD Rating: " + JSON.parse(body).imdbRating + "\n" +
				"Rotten Tamatos: " + JSON.parse(body).Ratings[0].Value + "\n" +
				"Country: " + JSON.parse(body).Country + "\n" +
				"Language: " + JSON.parse(body).Language + "\n" +
				"Movie Plot: " + JSON.parse(body).Plot + "\n" +
				"Actors: " + JSON.parse(body).Actors + "\n" +
				"-----------------------------------------------------------------------" ,function(err) {
					if (err) {
					  console.log(err);}
					;})
			}
	})
}
//Searching for concerts
if (command === "concert-this") {
	
	request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function (error, response, body) {
		if (!error && response.statusCode === 200) {
			
			console.log("-----------------------------------------------------------------------" + "\n" +
				"Venue: " + JSON.parse(body)[0].venue.name + "\n" +
				"Date: " + moment(JSON.parse(body)[0].datetime).format('MMMM Do YYYY, h:mm:ss a') + "\n" +
				"City: " + JSON.parse(body)[0].venue.city + "\n" +
				"State: " + JSON.parse(body)[0].venue.region + "\n" +
				"URL: " + JSON.parse(body)[0].url + "\n" +
				"-----------------------------------------------------------------------");
				fs.appendFile("log.txt", 
				"-----------------------------------------------------------------------" + "\n" +
				"Venue: " + JSON.parse(body)[0].venue.name + "\n" +
				"Date: " + moment(JSON.parse(body)[0].datetime).format('MMMM Do YYYY, h:mm:ss a') + "\n" +
				"City: " + JSON.parse(body)[0].venue.city + "\n" +
				"State: " + JSON.parse(body)[0].venue.region + "\n" +
				"URL: " + JSON.parse(body)[0].url + "\n" +
				"-----------------------------------------------------------------------" ,function(err) {
					if (err) {
					  console.log(err);}
					console.log("File saved!");});
					
		}
	})
}
// Reading file for do-what-it-says
if (command === "do-what-it-says") {
	// The code will store the contents of the reading inside the variable "body"
	fs.readFile("random.txt", "utf8", function(error, body) {

   // If the code experiences any errors it will log the error to the console.
  if (error) {
	return console.log('Error: ' + error);
  }
		// console.log("DDDD" + body);

		// Then split it 
		var bodyArr = body.split(",");
		
		// console.log("ARRRR" + bodyArr);

		search = bodyArr[1]
		// console.log("NNNN" + name);

		spotify.search({ type: 'track', query: search}, function(error, body) {

			// console.log(body.tracks.items);
		 if (error) {
			return console.log('Error: ' + error);
		  }
			var track = body.tracks.items[0];
			console.log(
			"-----------------------------------------------------------------------" + "\n" +
			"Song Title: " + track.name + "\n" +
			"Artist: " + track.artists[0].name + "\n" +
			"Album: " + track.album.name + "\n" + 
			"Preview Link: " + track.preview_url + "\n" +
			"-----------------------------------------------------------------------"
			)
			fs.appendFile("log.txt", 
			"-----------------------------------------------------------------------" + "\n" +
			"Song Title: " + track.name + "\n" +
			"Artist: " + track.artists[0].name + "\n" +
			"Album: " + track.album.name + "\n" + 
			"Preview Link: " + track.preview_url + "\n" +
			"-----------------------------------------------------------------------" ,function(err) {
				if (err) {
				  console.log(err);}
				console.log("File saved!");})
		})
	});
}

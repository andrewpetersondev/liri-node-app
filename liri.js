// import packages and configure them for later use
// =====================================================================================================================================
require("dotenv").config();
var fs = require("fs");
const axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

// global variables
// =====================================================================================================================================

// user inputs 
var command = process.argv[2];
var input = process.argv[3];

// functions
// =====================================================================================================================================

function runUserInput(command, input) {
    switch (command) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThisSong(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-says":
            doWhatItSays(input);
            break;
            default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
			"\r\n" + "1. concert-this 'any artist or band name' " +"\r\n"+
			"2. spotify-this-song 'any song name' "+"\r\n"+
			"3. movie-this 'any movie name' "+"\r\n"+
			"4. do-what-it-says."+"\r\n"+
			"\r\n" + "Be sure to put the movie or song name in quotation marks if it's more than one word." + "\r\n");
    }
}

async function concertThis(input) {

    // construct queryURL
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    try {
        const response = await axios.get(queryURL);

        for (var i = 0; i < response.data.length; i++) {

            // store concert results
            var venueName = response.data[i].venue.name;
            var venueLocation = response.data[i].venue.city;
            var concertDate = response.data[i].datetime;
            var dateArray = concertDate.split("T");
            var momentDateFormat = moment(dateArray[0]).format("MM/DD/YYYY");

            // appending log file
            fs.appendFile("./log.txt", text, function (err) {

                if (err) {
                    console.log(err);
                }

                else {
                    console.log("Content Added!");
                }

            });

            // testing and debugging
            // console.log(response);
            // console.log(response.data);
            console.log("==============================================================" +
                "\nVenue Name: " + venueName +
                "\nVenue Location: " + venueLocation +
                "\nConcert Date: " + momentDateFormat);


        }

    } catch (error) {
        console.error(error);
    }
}


function spotifyThisSong(input) {

    if (!input) {
        input = "The Sign Ace of Base";
    }

    spotify.search({ type: 'track', query: input, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {

            // store songs data
            // var songs = data.tracks.items[i];
            var artist = data.tracks.items[i].album.artists[0].name;
            var songName = data.tracks.items[i].name;
            var albumName = data.tracks.items[i].album.name;
            var previewURL = data.tracks.items[i].preview_url;
            // var link = data.tracks.items[i].album.external_urls["spotify"];

            // testing and debugging
            // console.log(songs);
            console.log("===========================================" +
                "\nArtist: " + artist +
                "\nSong Name: " + songName +
                "\nAlbum Name: " + albumName +
                "\nPreview Link: " + previewURL);

        }
    });
}

function movieThis(input) {

    if (!input) {
        input = "Mr.Nobody";
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryURL = "http://www.omdbapi.com/?t=" + input + "&apikey=ead6c7f6";

    // This line is just to help us debug against the actual URL.
    console.log(queryURL);

    axios.get(queryURL).then(
        function (response) {

            var movieTitle = response.data.Title;
            var yearOfRelease = response.data.Year;
            var ratingIMDB = response.data.imdbRating;
            var ratingRottenTomatoes = response.data.Ratings[1].Value;
            var countryProduced = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actorsActresses = response.data.Actors;

            // testing and debugging
            console.log("============================================" +
                "\nMovie Title: " + movieTitle +
                "\nYear of Release: " + yearOfRelease +
                "\nRating IMDB: " + ratingIMDB +
                "\nRating Rotten Tomatoes: " + ratingRottenTomatoes +
                "\nCountry Produced: " + countryProduced +
                "\nLanguage: " + language +
                "\nPlot: " + plot +
                "\nActors & Actresses: " + actorsActresses);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays(input) {

    fs.readFile("./random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // print the contents of data
        // console.log(data);

        // split text from random.txt into a command and an input
        var dataArray = data.split(",");

        // display new array
        // console.log(dataArray);

        // store command and input as variables
        var command = dataArray[0];
        var input = dataArray[1];

        // testing and debugging
        // console.log(command);
        // console.log(input);

        runUserInput(command, input);

    });

}

// function appendLogFile(command, input) {

//     var text = "'\n===================================================='
//     '\nCommand: ' + command +
//         '\nInput: ' + input +
//         '\nResponse: ' +
//         "

//     fs.appendFileSync("./log.txt", text, function (err) {

//         // If an error was experienced we will log it.
//         if (err) {
//             console.log(err);
//         }

//         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//         else {
//             console.log("Content Added!");
//         }

//     });


// }


// main processes
// =====================================================================================================================================
runUserInput(command, input);
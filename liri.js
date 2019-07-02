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
        default:
            console.log("Your input was invalid. Please input the following format : node liri.js 'command' 'input' ");
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

    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // store songs data
        // var songs = data.tracks.items[0];
        var artist = data.tracks.items[0].album.artists[0].name;
        var songName = data.tracks.items[0].name;
        var link = data.tracks.items[0].album.external_urls["spotify"];
        var albumName = data.tracks.items[0].album.name;

        // testing and debugging
        console.log("===========================================" +
            "\nArtist: " + artist +
            "\nSong Name: " + songName +
            "\nPreview Link: " + link +
            "\nAlbum Name: " + albumName);

        // console.log(link);
    });
};

function movieThis(input) {

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
                "\nMovie Title:" + movieTitle +
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
};

function doWhatItSays(input) {




};


// main processes
// =====================================================================================================================================
runUserInput(command, input);
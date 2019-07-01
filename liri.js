// import packages and configure them for later use
// =====================================================================================================================================

// require dotenv should be the first line of the project
require("dotenv").config();

// fs is a core Node package for reading and writing files
var fs = require("fs");

// Grab the axios package...
var axios = require("axios");

// import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// access keys information
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// moment
var moment = require('moment');

// testing and debugging
// console.log(keys);



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
            console.log("run concert this");
            concertThis(input);
            break;
        case "spotify-this-song":
            console.log("run spotify this song");
            spotifyThisSong(input);
            break;
        case "movie-this":
            console.log("run movie this");
            movieThis(input);
            break;
        case "do-what-it-says":
            console.log("run do what it says");
            doWhatItSays(input);
            break;
        default:
            console.log("invalid option");

    }
}


// main processes
// =====================================================================================================================================

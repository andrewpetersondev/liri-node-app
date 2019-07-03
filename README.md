# liri-node-app

## Overview

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
Give a high-level overview of how the app is organized
Give start-to-finish instructions on how to run the app
Include screenshots, gifs or videos of the app functioning
Contain a link to a deployed version of the app
Clearly list the technologies used in the app
State your role in the app development

### Valid Commands

- concert-this
- spotify-this-song
- movie-this
- do-what-it-says

## Step By Step Instructions

1. Open terminal and navigate to liri-node-app folder.

2. There are 4 valid commands listed above. If you want to see Ed Sheerans's upcoming concerts you would do the following command.

```
node liri.js concert-this "ed sheeran"
```

3. The output from the above input looks like this.

[Concert Output](images/concert-output.png)

## Packages

- node spotifiy api
- axios
- moment
- DotEnv

## APIs

- OMDB API
- Bands in Town API

## node spotify api search method #1

- supposed to be the easiest method according to documentation

```js

search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

```

## node spotify api search method #2

```js

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data);
});

```

## axios get request

```js
const axios = require("axios");

// Make a request for a user with a given ID
axios
  .get("/user?ID=12345")
  .then(function(response) {
    // handle success
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });

// Optionally the request above could also be done as
axios
  .get("/user", {
    params: {
      ID: 12345
    }
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    // always executed
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### Example 2

```
node liri.js spotify-this-song "beautiful people"
```

[Spotify Ouput](images/spotify-output.png)

### Example 3

```
node liri.js movie-this "caddyshack"
```

[movie output](images/movie.png)

## Sources

This project may have code from class activities, office hours notes, or from seeking help from TAs and teachers.

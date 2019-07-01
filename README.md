# liri-node-app

## Instructions

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

In order to meet the Employer Competitive standards and be ready to show your application to employers, the README.md file should meet the following criteria:

Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
Give a high-level overview of how the app is organized
Give start-to-finish instructions on how to run the app
Include screenshots, gifs or videos of the app functioning
Contain a link to a deployed version of the app
Clearly list the technologies used in the app
State your role in the app development

## node spotify api search method

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
## dot env package


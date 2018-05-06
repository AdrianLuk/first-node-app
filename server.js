//GRAB THE PACKAGES AND VARIABLES WE NEED
// ========================================================

const express = require("express");
const app = express();
const ig = require("instagram-node").instagram();

// CONFIGURE THE APP
// ==============================================================
// tell node where to look for site resources
app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set("view engine", "ejs");

//configure the instagram app with access token
ig.use({
    //get access token here : http://instagram.pixelunion.net/
    access_token: "524412987.1677ed0.1f03fbf431fc4232a0f529bf2762e4a5"
});
//SET THE ROUTES
// ===============================================================
// //home page route - our profile's images
// app.get("/", function(req, res) {
//     // use the instagram packages to get our profile's media
//     // render the home page and pass in our profile's images
//     res.render("pages/index");
// });

// home page route - popular images
app.get("/", function(req, res) {
    //use the instagram package to get popular media
    ig.user_self_media_recent(function(
        err,
        medias,
        pagination,
        remaining,
        limit
    ) {
        res.render("pages/index", { grams: medias });
    });
});

//start the server on port 8080
app.listen(8080);
//send a message
console.log("App started! Look at http://localhost:8080");

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const axios = require('axios');
const { log } = require('console');
const port = 8082;
var options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',

    headers: { 'X-RapidAPI-Key': '9ecc63482cmsh79fdbcc4e31a22dp12d90bjsnecbc5789de4a', 'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com' }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/music', async (req, res) => {

    try {
        const response = await axios.request(
            {
                ...options, params: {
                    track: 'sanam re'
                    // 7d73edc9d4mshead0ad25150f704p1d6463jsn2da0b0d46451
                }//9ecc63482cmsh79fdbcc4e31a22dp12d90bjsnecbc5789de4a
            }
        );
        console.log(response.data);
        // res.redirect(response.data.youtubeVideo.audio[0].url);
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});

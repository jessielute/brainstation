//SPOILER ALERT! 
//WELCOME TO THE MACHINE

//SET UP MODULES
const cheerio = require('cheerio');
const request = require('request');
//var http = require("https");

//TAKE INPUT FROM USER
//movie title and seconds
const movieInput = process.argv[2];
const seconds = parseInt(process.argv[3]);

let url = "https://www.google.com/search?q=" + movieInput + "+film";
request(url, function (error, response, body) {
    console.log('While we wait, here is some news about the movie ' + movieInput + '.')
    if (!error) {
        const $ = cheerio.load(body);
        const movieNews = $("h3.r").each(function (indexPosition) {
            console.log(indexPosition + ": " + $(this).text());
        });
    }
});

//checks if iput is a valid respnse. 
//THIS DOES NOT WORK YET. 
/*function notAMovie(movieSpoiler, body) {
    while (movieSpoiler.p = "There are no movies that matched your query."); {
        console.log("***BAD HUMAN. Please pick a real movie title.***");
        break;
    };
}*/

//SPOILER MESSAGE
function spoilerAlert() {
    console.log("***SPOILER ALERT!!! I will spoil the movie " + movieInput + " in " + seconds + " seconds.***");
}

//uses API to fetch data on user's selected movie
function moviePlot(movieInput, options) {
    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        qs:
            {
                include_adult: 'false',
                page: '1',
                query: movieInput,
                language: 'en-US',
                api_key: 'cd9b0b6a5f58ff82755c2168c6095cdb'
            },
        body: '{}'
    };

    //GETS MOVIE INFO
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        else {
            let movieSpoiler = JSON.parse(body);
            setTimeout(() => { console.log(movieSpoiler.results[0].overview) }, seconds * 1000);
        }
    });

   

};
 //CALL FUNCTIONS
moviePlot(movieInput, seconds);
spoilerAlert(movieInput);



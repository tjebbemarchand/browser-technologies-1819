const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const path = require('path');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('app/public/'));

app.get('/', renderHomepage);
app.get('/team/:team', renderOverviewPage);

function renderHomepage(req, res) {
    const randomNumbers = generateRandomNumbers();

    fs.readFile(__dirname + '/public/eredivisie.json', function(error, data) {
        if(error) throw error;

        const dataJSON = JSON.parse(data.toString());

        const currentGame = [dataJSON.teams[randomNumbers[0]], dataJSON.teams[randomNumbers[1]]];
        const teams = dataJSON.teams;

        res.render('pages/index', {
            currentGame,
            teams
        });
    });
}

function renderOverviewPage(req, res) {
    fs.readFile(__dirname + '/public/eredivisie.json', function(error, data) {
        if(error) throw error;

        const dataJSON = JSON.parse(data.toString());

        const teamOne = dataJSON.teams.filter(function(teams) {
            return teams.link === req.params.team;
        })[0];
        let teamTwo = dataJSON.teams[Math.round(Math.random() * (18 - 1) + 1)];

        // while(teamOne.team === teamTwo.team) {
        //     teamTwo = dataJSON.teams[Math.round(Math.random() * (18 - 1) + 1)];
        // }

        const teams = [teamOne, teamTwo];

        res.render('pages/team', {
            teams: teams,
            randomColor: randDarkColor()
        })
    });
}

function generateRandomNumbers() {
    const randomNumbers = [];
    randomNumbers.push(Math.round(Math.random() * (18 - 1) + 1));
    randomNumbers.push(Math.round(Math.random() * (18 - 1) + 1));

    while(randomNumbers[0] === randomNumbers[1]) {
        while(randomNumbers.length > 0) {
            randomNumbers.pop();
        }
        randomNumbers.push(Math.round(Math.random() * (18 - 1) + 1));
        randomNumbers.push(Math.round(Math.random() * (18 - 1) + 1));
    }

    return randomNumbers;
}

function randDarkColor() {
    const lum = -0.25;
    const hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});
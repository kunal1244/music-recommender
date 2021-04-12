const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');
const {PythonShell} = require('python-shell');
const SpotifyWebApi = require("spotify-web-api-node");
// const recommendations = require("recommendations.csv");

// const {sequelize, data, location} = require('./sequelize');
// const { QueryTypes } = require('sequelize');
const PORT = 3030;
const LastfmAPI = require('lastfmapi');

const scopes = [
	"playlist-modify-public"
];

require("dotenv").config();


let spotifyConfig = {
	clientId: process.env.SPOTIFY_API_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_CALLBACK_URL,
}

var spotifyApi = new SpotifyWebApi(spotifyConfig);

var lfm = new LastfmAPI({
	'api_key' : process.env.LASTFM_API_KEY,
	'secret' : process.env.LASTFM_API_SECRET
});


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))
app.use(express.static(path.join(path.dirname(__dirname), "dist")));


app.get("/login", (req, res) => {
	var html = spotifyApi.createAuthorizeURL(scopes);
	res.redirect(html + "&show_dialog=true");
});

app.get("/callback", async (req, res) => {
	const { code } = req.query;
	try {
		var data = await spotifyApi.authorizationCodeGrant(code);
		const { access_token, refresh_token } = data.body;
		spotifyConfig.accessToken = access_token;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);
		await fs.writeFile("oauthtoken", access_token, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
		console.log(access_token + "         " + refresh_token);
		res.redirect("http://localhost:3030");
	} catch (err) {
		res.redirect("/#/error/invalid token");
	}
});


app.post('/lastfm', async (req, res) => {
	let data = {};

	await lfm.user.getTopTracks({
		'limit' : 200,
		'period' : 'overall',
		'user' : req.body.lastfmid,
	}, function (err, response) {
		if (err) { throw err; }
		else{
			response.track.forEach(track => {
				data[track.name] = {
					"track" : track.name,
					"artist" : track.artist.name,
					"count" : track.playcount 
				}
			});
			let output = [];
			for(item in data){
				output.push(data[item]);
			}
			const fields = [ 'track', 'artist', 'count' ];
			const opts = {fields}
			try {
				const parser = new Parser(opts);
				const csv = parser.parse(output);
				fs.writeFile("songs.csv", csv, function(err) {
					if(err) {
						return console.log(err);
					}
					console.log("The file was saved!");
				});
			} catch (err) {
				console.error(err);
			}
		}
	});

	let topdata = {
		'albums' : [],
		'artists' : [],
		'tags' : []
	}

	lfm.user.getTopArtists({
		'user' : req.body.lastfmid
	}, function (err, response) {
		response.artist.forEach(artist => topdata.artists.push(artist.name));
		lfm.user.getTopAlbums({
			'user' : req.body.lastfmid
		}, function (err, response) {
			response.album.forEach(album => topdata.albums.push(album.name));
			// lfm.user.getTopTags({
			// 	'user' : req.body.lastfmid
			// }, function (err, response) {
			// 	console.log(response);
			// 	response.toptags.tag.forEach(tag => topdata.tags.push(tag.name));
			res.send(topdata);
			// });
		});
	});

});

app.get('/get-recommendations', async (req, res) => {
	// PythonShell.run('model.py', null, function (err) {
	// 	if (err) throw err;
	// 	console.log('recommendations received');
	// });

	await fs.readFile('recommendations.csv', 'utf-8', function(err, data) {
		data = data.split('\n');
		data.pop();
		for(let i = 0; i < data.length; i++){
			data[i] = "spotify:track:" + data[i];
		}

	});
	res.send("Done!")
});

app.get('/create-playlist', async (req, res) => {
	let options = {
		pythonOptions: ['-u'],
		args: [spotifyApi.getAccessToken()]
	};
	PythonShell.run('csv-to-playlist.py', options, function (err) {
		if (err) throw err;
		console.log('sent');
	});
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

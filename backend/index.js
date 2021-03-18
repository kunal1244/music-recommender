const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');
const { PythonShell } =require('python-shell'); 

// const {sequelize, data, location} = require('./sequelize');
// const { QueryTypes } = require('sequelize');
const PORT = 3030;
const LastfmAPI = require('lastfmapi');

require("dotenv").config();

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


app.post('/lastfm', async (req, res) => {
	let data = {};

	lfm.user.getRecentTracks({
		'limit' : 200,
		'user' : req.body.lastfmid,
		'extended' : 1
	}, function (err, response) {
		if (err) { throw err; }
		else{
			response.track.forEach(track => {
				data[track.name] = {
					"track" : track.name,
					"artist" : track.artist.name 
				}
				if(track.name in Object.keys(data)){
					data[track.name].count++;
				}
				else{
					data[track.name].count = 1;
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
				res.redirect('http://localhost:3030');
			} catch (err) {
				console.error(err);
			}
		}
	});
	
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

const express = require('express');
const apicache = require('apicache');
const cors = require('cors');
const cache = apicache.middleware;
const {sequelize, data, location} = require('./sequelize');
const { QueryTypes } = require('sequelize');
const PORT = 3030;

const app = express();
app.use(cors());
app.use(cache('1 hour'));

app.get('/', async (req, res) => {
	let countries = await data.findAll({
		group: ["biz_country"],
		attributes: ['biz_country', [sequelize.fn('COUNT', 'id'), 'count']], 
	}).catch((err) => {
		console.log(err);
	});
	let country_data = {};
	for(let temp of countries){
		let num_chapters = await location.findOne({
			attributes: ['chapters'],
			where: {
				'country' : temp['biz_country']
			}
		})
		if(num_chapters != undefined){
			let country = temp['biz_country'];
			country_data[country] = {
				"count" : temp.dataValues.count,
				"chapters" : num_chapters.dataValues.chapters
			}
		}
		else{
			console.log(temp.dataValues.biz_country);
		}
	}
	return res.json(country_data);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

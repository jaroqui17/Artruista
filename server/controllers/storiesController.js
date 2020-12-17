const db = require('../models/index2.js');

const storiesController = {};

//postStory should create a new item in the database
storiesController.postStory = (req, res, next) => {
	// get input from the req.body
	const { firstName, lastName, story, help, payment, lat, lng } = req.body;
	const add =
		'INSERT INTO Stories (firstname, lastname, story, help, payment, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
	db.query(add, [firstName, lastName, story, help, payment, lat, lng])
		.then((item) => {
			res.locals.item = item.rows[0];
			return next();
		})
		.catch((err) => {
			return next('there is an error in postStory' + JSON.stringify(err));
		});
};

//getStories should retrieve all items from database and send it back to the client as json
storiesController.getStories = (req, res, next) => {
	const results = 'SELECT * FROM Stories';
	db.query(results)
		.then((stories) => {
			res.locals.stories = stories.rows;
			return next();
		})
		.catch((err) => {
			return next('there is an error in getStories' + JSON.stringify(err));
		});
};

//deleteStory should find item based on a Id number and delete that item if it exists
storiesController.deleteStory = (req, res, next) => {
	const id = req.params.id;
	const deleteStory = 'DELETE FROM Stories WHERE id = $1';
	db.query(deleteStory, [id])
		.then((data) => {
			return next();
		})
		.catch((err) => {
			return next('there is an error in deleteStory' + JSON.stringify(err));
		});
};

//getOne should find item based on a ID number and return this item
storiesController.getOne = (req, res, next) => {
	const id = req.params.id;
	const result = 'SELECT * FROM Stories WHERE id=$1;';
	db.query(result, [id])
		.then((story) => {
			res.locals.oneStory = story.rows[0];
			return next();
		})
		.catch((err) => {
			return next('there is an error in getOne' + JSON.stringify(err));
		});
};
module.exports = storiesController;

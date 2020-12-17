const express = require('express');
const router = express.Router();

const storiesController = require('../controllers/storiesController.js');

//get all the stories
router.get('/', storiesController.getStories, (req, res) => {
	res.status(200).json(res.locals.stories);
});

//create a story
router.post('/', storiesController.postStory, (req, res) => {
	res.status(200).json(res.locals.item);
});

//delete one story
router.delete('/:id', storiesController.deleteStory, (req, res) => {
	res.status(204).json('story deleted');
});

//get one story
router.get('/:id', storiesController.getOne, (req, res) => {
	res.status(200).json(res.locals.oneStory);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

// the scope is what is being retrieved (profile info in this case)
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// the authenticate exchanges the code with the information
// once the user is redirected here, call on the strategy once again
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect(`#/`);
});

module.exports = router;

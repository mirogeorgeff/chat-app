const { addMessage, getMessages } = require('../controllers/messageController');
const router = require('express').Router();

router.route('/add-message/').post(addMessage);
router.route('/get-message/').post(getMessages);

module.exports = router;

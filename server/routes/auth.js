const { login, register, getAllUsers, setAvatar, logOut } = require('../controllers/userController');
const router = require('express').Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/allusers/:id').get(getAllUsers);
router.route('/setavatar/:id').post(setAvatar);
router.route('/logout/:id').get(logOut);

module.exports = router;

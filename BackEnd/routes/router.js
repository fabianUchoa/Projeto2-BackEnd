const express = require('express');
const router = express.Router();
const auth = require('../controllers/AuthController');
const user = require('../controllers/UserController');
const event = require('../controllers/EventController');
const log = require('../controllers/LogController');

router.post('/login', auth.login);
router.post('/logout', auth.logout);

router.get('/users', auth.ensureAuth, user.listUsers);
router.post('/new-user', user.createUser);
router.delete('/users/:id', auth.ensureAuth, user.deleteUser);
router.put('/updateUser/:id', auth.ensureAuth, user.updateUser);

router.get('/user/events', auth.ensureAuth, event.listEvents);
router.post('/new-event', auth.ensureAuth, event.createEvent);
router.delete('/events/delete/:id', auth.ensureAuth, event.deleteEvent);

router.get('/listLogs', auth.ensureAuth, log.listLogs);
router.post('/logs', auth.ensureAuth, log.createLog);

module.exports = router;
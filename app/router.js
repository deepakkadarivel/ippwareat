import express from 'express';
import login from './auth';
import getTasks from './tasks';
import getPO from './tasks/po';
const router = express.Router();

const getAppStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'App Initialized'
  })
};

router.get('/', getAppStatus);
router.post('/login', login);
router.post('/tasks', getTasks);
router.post('/po', getPO);

module.exports = router;
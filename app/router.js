import express from 'express';
import login from './auth';
const router = express.Router();

const getAppStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'App Initialized'
  })
};

router.get('/', getAppStatus);
router.post('/login', login);

module.exports = router;
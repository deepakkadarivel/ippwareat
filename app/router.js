import express from 'express';
const router = express.Router();

const getAppStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'App Initialized'
  })
};

router.get('/', getAppStatus);

module.exports = router;
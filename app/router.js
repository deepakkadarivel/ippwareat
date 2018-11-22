import express from 'express';
import login from './auth';
import getTasks from './tasks';
import getPO from './tasks/po';
import getPickUp from "./tasks/pickUp";
import getInvoice from "./tasks/invoice";
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
router.post('/pickUp', getPickUp);
router.post('/invoice', getInvoice);

module.exports = router;
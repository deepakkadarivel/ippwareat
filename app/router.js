import express from 'express';
import login from './auth';
import getTasks from './tasks';
import {getPO, updatePO} from './tasks/po';
import {getPickUp, updatePickUp} from './tasks/pickUp';
import getInvoice from './tasks/invoice';
import getAsset from './tasks/asset';

const router = express.Router();

const getAppStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'App Initialized'
  });
};

router.get('/', getAppStatus);
router.post('/login', login);
router.post('/tasks', getTasks);
router.post('/po', getPO);
router.post('/updatePO', updatePO);
router.post('/pickUp', getPickUp);
router.post('/updatePickUp', updatePickUp);
router.post('/invoice', getInvoice);
router.post('/asset', getAsset);

module.exports = router;

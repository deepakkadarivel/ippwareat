import express from 'express';
import login from './auth';
import getTasks from './tasks';
import {getPO, updatePO} from './tasks/po';
import {getPickUp, updatePickUp} from './tasks/pickUp';
import {getInvoice, updateInvoice} from './tasks/invoice';
import {getAsset, updateAsset} from './tasks/asset';
import {getEntityDetails, getExpenseGrid, getItemData} from "./expense";

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
router.post('/updateInvoice', updateInvoice);
router.post('/asset', getAsset);
router.post('/updateAsset', updateAsset);
router.post('/entityDetails', getEntityDetails);
router.post('/itemData', getItemData);
router.post('/expenseGrid', getExpenseGrid);

module.exports = router;

import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.ASSET}`;

const parseAsset = asset => {
  return {
    header: [
      {
        label: 'Chrome_Entity',
        id: 'entityName',
        name: 'entityName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: asset.entityName,
        readOnly: true
      },
      {
        label: 'Chrome_View',
        id: 'viewName',
        name: 'viewName',
        maxlength: '50',
        placeholder: 'View',
        type: 'text',
        value: asset.viewName,
        readOnly: true
      },
      {
        label: 'Asset Request #',
        id: 'assetRequestNo',
        name: 'assetRequestNo',
        maxlength: '50',
        placeholder: 'Asset Request #',
        type: 'text',
        value: asset.assetRequestNo,
        readOnly: true
      },
      {
        label: 'Workflow',
        id: 'workflowId',
        name: 'workflowId',
        type: 'select',
        value: asset.workflowId,
        readOnly: true,
        options: Object.values(asset.workflowList).map(x => {
          return {value: x.workflowId, label: x.workflowName};
        })
      },
      {
        label: 'WareHouse',
        id: 'wareHouse',
        name: 'wareHouse',
        type: 'select',
        value: asset.wareHouse,
        readOnly: true,
        options: Object.values(asset.wareHouseList).map(x => {
          return {value: x.wareHouseMasterId, label: x.value};
        })
      },
      {
        label: 'Need Date',
        id: 'needDate',
        name: 'needDate',
        type: 'date',
        value: asset.needDate,
        readOnly: true
      },
      {
        label: 'Return Date',
        id: 'returnDate',
        name: 'returnDate',
        type: 'date',
        value: asset.returnDate,
        readOnly: true
      }
    ],
    assetLineItems: !asset.assetTracking ? [] : asset.assetTracking.assetLineItems.map((x, y) => {
      return {
        header: x.itemDescription,
        assetLineItemId: x.assetLineItemId,
        itemNo: x.itemNo,
        uom: x.uom,
        qty: x.qty,
        newItem: x.isLinked === 'N' ? x.itemDescription : '',
      };
    }),
    comments: asset.comments,
    pickUpItemId: asset.pickUpItemId,
    assetId: asset.assetId,
    workflowAuditId: asset.workflowAuditId,
    taskId: asset.taskId,
    seqFlow: asset.seqFlow,
    auditTrackId: asset.auditTrackId,
    processInstanceId: asset.processInstanceId,
    pickUpItemRequestNo: asset.assetRequestNo,
    workflowId: asset.workflowId,
    wareHouse: asset.assetTracking ? asset.assetTracking.wareHouse : '',
    needDate: asset.needDate,
    returnDate: asset.returnDate,
    companyId: asset.companyId,
    dynamicColumns: asset.assetTracking ? asset.assetTracking.dynamicColumns : '',
    entityId: asset.entityId,
    entityName: asset.entityName,
    viewId: asset.viewId,
    viewName: asset.viewName,
    requesterId: asset.requesterId
  };
};

const getAsset = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const {cookie, loadBalancer, payload} = req.body;

    const config = {
      headers: {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded',
        Cookie: cookie
      }
    };

    const response = await axios.post(url, payload, config);

    if (!response.data) {
      let err = new Error(constants.INVALID_USER);
      err.status = 401;
      next(err);
    } else {
      const asset = await parseAsset(response.data);
      // logger.info(JSON.stringify(asset));
      res.status(200).json(asset);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};

const updateAsset = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const {cookie, loadBalancer, payload} = req.body;

    const config = {
      headers: {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded',
        Cookie: cookie
      }
    };

    const response = await axios.post(url, payload, config);

    if (!response.data) {
      let err = new Error(constants.INVALID_USER);
      err.status = 401;
      next(err);
    } else {
      res.status(200).json(response.data);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export {getAsset, updateAsset};

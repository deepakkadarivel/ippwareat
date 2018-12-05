import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.PICK_UP}`;

const parsePickUp = pickUp => {
  return {
    header: [
      {
        label: 'Requesting Chrome_Entity',
        id: 'entityName',
        name: 'entityName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: pickUp.entityName,
        readOnly: true
      },
      {
        label: 'Pickup Request #',
        id: 'pickUpItemRequestNo',
        name: 'pickUpItemRequestNo',
        maxlength: '50',
        placeholder: 'Request #',
        type: 'text',
        value: pickUp.pickUpItemRequestNo,
        readOnly: true
      },
      {
        label: 'Workflow',
        id: 'workflowId',
        name: 'workflowId',
        type: 'select',
        value: pickUp.workflowId,
        readOnly: true,
        options: pickUp.workflowList.map(x => {
          return {value: x.workflowId, label: x.workflowName};
        })
      },
      {
        label: 'Receiving Warehouse',
        id: 'fromWarehouse',
        name: 'fromWarehouse',
        type: 'select',
        value: pickUp.fromWarehouse,
        readOnly: true,
        options: pickUp.wareHouseList.map(x => {
          return {value: x.wareHouseMasterId, label: x.value};
        })
      },
      {
        label: 'Transferring Chrome_Entity',
        id: 'toEntityName',
        name: 'toEntityName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: pickUp.toEntityName,
        readOnly: true
      },
      {
        label: 'Transferring Warehouse',
        id: 'wareHouseName',
        name: 'wareHouseName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: pickUp.wareHouseName,
        readOnly: true
      },
      {
        label: 'Dispatch Type',
        id: 'attribute_5',
        name: 'attribute_5',
        type: 'select',
        value: pickUp.attribute_5,
        readOnly: false,
        options: Object.values(pickUp.jsonAttributeValuesMap).map(x => {
          return {value: x.valueId, label: x.values};
        })
      },
      {
        label: 'Mode of Transport',
        id: 'attribute_1',
        name: 'attribute_1',
        maxlength: '250',
        type: 'textArea',
        value: pickUp.attribute_1,
        readOnly: false,
        rowsMax: 4
      },
      {
        label: 'Location',
        id: 'attribute_2',
        name: 'attribute_2',
        maxlength: '250',
        type: 'textArea',
        value: pickUp.attribute_2,
        readOnly: false,
        rowsMax: 4
      },
      {
        label: 'GSTIN',
        id: 'attribute_3',
        name: 'attribute_3',
        maxlength: '250',
        type: 'textArea',
        value: pickUp.attribute_3,
        readOnly: false,
        rowsMax: 4
      },
      {
        label: 'Address',
        id: 'attribute_4',
        name: 'attribute_4',
        maxlength: '250',
        type: 'textArea',
        value: pickUp.attribute_4,
        readOnly: false,
        rowsMax: 4
      }
    ],
    pickUpLineItems: pickUp.pickUpItem.pickUpLineItems.map((x, y) => {
      return {
        header: x.itemDescription,
        lineItemId: (y + 1).toString(),
        itemNo: x.itemNo,
        uom: x.uom,
        qty: x.qty,
      };
    }),
    footer: [
      {
        label: 'Comments',
        id: 'comments',
        name: 'comments',
        maxlength: '50',
        placeholder: 'Comments',
        type: 'textArea',
        value: pickUp.comments,
        readOnly: true,
        variant: 'outlined'
      }
    ],
    entityId: pickUp.entityId,
    toEntityId: pickUp.toEntityId,
    wareHouse: pickUp.pickUpItem.wareHouse,
    dynamicColumns: pickUp.dynamicColumns
  };
};

const getPickUp = async (req, res, next) => {
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
      const pickUp = await parsePickUp(response.data);
      // logger.info(JSON.stringify(pickUp));
      res.status(200).json(pickUp);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export default getPickUp;

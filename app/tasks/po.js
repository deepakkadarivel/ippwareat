import axios from "axios";
import logger from "../logger";
import constants from "../constants";

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.PO}`;

const parsePo = po => {
  return {
    header: [
      {
        label: 'Chrome_Entity',
        id: 'entityName',
        name: 'entityName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: po.entityName,
        readOnly: true,
      },
      {
        label: 'Chrome_View',
        id: 'viewName',
        name: 'viewName',
        maxlength: '50',
        placeholder: 'View',
        type: 'text',
        value: po.viewName,
        readOnly: true,
      },
      {
        label: 'Type',
        id: 'poFromLabel',
        name: 'poFromLabel',
        maxlength: '50',
        placeholder: 'Type',
        type: 'text',
        value: po.poFromLabel,
        readOnly: true,
      },
      {
        label: 'PO Request #',
        id: 'requisitionNo',
        name: 'requisitionNo',
        maxlength: '50',
        placeholder: 'PO Request #',
        type: 'text',
        value: po.requisitionNo,
        readOnly: true,
      },
      {
        label: 'Reference PO #',
        id: 'poNumber',
        name: 'poNumber',
        maxlength: '50',
        placeholder: 'PO #',
        type: 'text',
        value: po.poNumber,
        readOnly: true,
      },
      {
        label: 'Workflow',
        id: 'workflowName',
        name: 'workflowName',
        maxlength: '50',
        placeholder: 'Workflow',
        type: 'text',
        value: po.workflowName,
        readOnly: true,
      },
      {
        label: 'Supplier',
        id: 'supplierName',
        name: 'supplierName',
        maxlength: '50',
        placeholder: 'Supplier',
        type: 'text',
        value: po.supplierName,
        readOnly: true,
      },
      {
        label: 'Currency',
        id: 'CurrencyCode',
        name: 'CurrencyCode',
        maxlength: '50',
        placeholder: 'Currency',
        type: 'text',
        value: po.currencyCode,
        readOnly: true,
      },
      {
        label: 'Billing Address',
        id: 'billingAddressId',
        name: 'billingAddressId',
        type: 'select',
        value: po.billingAddressId,
        readOnly: true,
        options: [
          {
            value: po.billingAddress.addressId,
            label: po.billingAddress.name
          }
        ]
      },
      {
        label: 'Ship To Address',
        id: 'shippingAddressId',
        name: 'shippingAddressId',
        type: 'select',
        value: po.shippingAddressId,
        readOnly: true,
        options: [
          {
            value: po.shippingAddress.addressId,
            label: po.shippingAddress.name
          }
        ]
      },
    ],
    entityId: po.entityId,
    viewId: po.viewId,
    workflowId: po.workflowId,
    supplierId: po.supplierId,
    currency: po.currency,
  };
};

const getPO = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const {cookie, loadBalancer, payload} = req.body;

    const config = {
      headers: {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded',
        Cookie: cookie,
      }
    };

    const response = await axios.post(url, payload, config);

    if (!response.data) {
      let err = new Error(constants.INVALID_USER);
      err.status = 401;
      next(err);
    } else {
      const po = await parsePo(response.data);
      // logger.info(JSON.stringify(po));
      res.status(200).json(po);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export default getPO;

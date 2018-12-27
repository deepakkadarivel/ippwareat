import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

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
        readOnly: true
      },
      {
        label: 'Chrome_View',
        id: 'viewName',
        name: 'viewName',
        maxlength: '50',
        placeholder: 'View',
        type: 'text',
        value: po.viewName,
        readOnly: true
      },
      {
        label: 'Type',
        id: 'poFromLabel',
        name: 'poFromLabel',
        maxlength: '50',
        placeholder: 'Type',
        type: 'text',
        value: po.poFromLabel,
        readOnly: true
      },
      {
        label: 'PO Request #',
        id: 'requisitionNo',
        name: 'requisitionNo',
        maxlength: '50',
        placeholder: 'PO Request #',
        type: 'text',
        value: po.requisitionNo,
        readOnly: true
      },
      {
        label: 'Reference PO #',
        id: 'poNumber',
        name: 'poNumber',
        maxlength: '50',
        placeholder: 'PO #',
        type: 'text',
        value: po.poNumber,
        readOnly: true
      },
      {
        label: 'Workflow',
        id: 'workflowName',
        name: 'workflowName',
        maxlength: '50',
        placeholder: 'Workflow',
        type: 'text',
        value: po.workflowName,
        readOnly: true
      },
      {
        label: 'Supplier',
        id: 'supplierName',
        name: 'supplierName',
        maxlength: '50',
        placeholder: 'Supplier',
        type: 'text',
        value: po.supplierName,
        readOnly: true
      },
      {
        label: 'Currency',
        id: 'CurrencyCode',
        name: 'CurrencyCode',
        maxlength: '50',
        placeholder: 'Currency',
        type: 'text',
        value: po.currencyCode,
        readOnly: true
      },
      {
        label: 'Billing Address',
        id: 'billingAddressId',
        name: 'billingAddressId',
        type: 'select',
        value: po.billingAddressId,
        readOnly: true,
        options: po.billingAddress ? [{
          value: po.billingAddress.addressId,
          label: po.billingAddress.name
        }] : []
      },
      {
        label: 'Ship To Address',
        id: 'shippingAddressId',
        name: 'shippingAddressId',
        type: 'select',
        value: po.shippingAddressId,
        readOnly: true,
        options: po.shippingAddress ? [{
          value: po.shippingAddress.addressId,
          label:
          po.shippingAddress.name
        }] : []

      }
    ],
    poLineItems: po.poLineItems.map((x, y) => {
      return {
        header: x.itemDescription,
        lineItemId: x.poLineItemId,
        categoryDesc: x.categoryDesc,
        subCategoryDesc: x.subCategoryDesc,
        receivedQty: x.receivedQty.toString(),
        uom: x.uom,
        netPrice: x.netPrice,
        sgst: x.sgst,
        cgst: x.cgst,
        igst: x.igst,
        tax: x.tax,
        totalAmount: x.totalAmount,
        price: x.price,
        quantity: x.quantity,
        itemId: x.items.itemId,
        qty: x.quantity,
        currency: x.items.currency,
        desc: x.items.description1,
        otherTax: x.otherTax,
        taxName: x.taxName,
        hsnCode: x.items.hsnORsacCode,
        categoryId: x.items.categoryId,
        subCategoryId: x.items.subCategoryId,
      };
    }),
    comments:
    po.comments,
    requisitionNo:
    po.requisitionNo,
    workflowId:
    po.workflowId,
    supplierId:
    po.supplierId,
    currency:
    po.currency,
    shippingAddressId:
    po.shippingAddressId,
    billingAddressId:
    po.billingAddressId,
    purchaseOrder:
    po.purchaseOrder,
    requisitionId:
    po.requisitionId,
    workflowAuditId:
    po.workflowAuditId,
    taskId:
    po.taskId,
    seqFlow:
    po.seqFlow,
    auditTrackId:
    po.auditTrackId,
    processInstanceId:
    po.processInstanceId,
    poFrom:
    po.poFrom,
    companyId:
    po.companyId,
    dynamicColumns:
      po.dynamicColumns || '',
    terms:
    po.terms,
    paymentTerms:
    po.paymentTerms,
    entityId:
    po.entityId,
    entityName:
    po.entityName,
    viewId:
    po.viewId,
    viewName:
    po.viewName,
    requesterId:
    po.requesterId,
    parentId:
    po.parentId,
    poAmendment:
    po.poAmendment,
    discount:
    po.discount,
    amendmentEdit:
    po.amendmentEdit,
    startDate:
    po.startDate,
    endDate:
    po.endDate,
    email:
    po.email,
    isAddressInput:
    po.isAddressInput,
    isAdvance:
    po.isAdvance,
    isAdvancePaid:
    po.isAdvancePaid,
    advancePayment:
    po.advancePayment,
    deliveryAddress:
    po.deliveryAddress,
    contactNo:
    po.contactNo,
    tinNo:
    po.tinNo,
    vatNo:
    po.vatNo,
  }
    ;
};

const getPO = async (req, res, next) => {
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
      const po = await parsePo(response.data);
      res.status(200).json(po);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};

const updatePO = async (req, res, next) => {
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
export {getPO, updatePO};

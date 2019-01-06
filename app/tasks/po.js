import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.PO}`;

const parsePo = po => {
  return {
    poFromLabel: po.poFromLabel,
    workflowName: po.workflowName,
    supplierName: po.supplierName,
    currencyCode: po.currencyCode,
    billingAddress: po.billingAddress ? [{
      value: po.billingAddress.addressId,
      label: po.billingAddress.name
    }] : [],
    shippingAddress: po.shippingAddress ? [{
      value: po.shippingAddress.addressId,
      label:
      po.shippingAddress.name
    }] : [],
    header: [],
    poLineItems: po.poLineItems.map(x => {
      return {
        itemDescription: x.itemDescription,
        comments: x.comments,
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

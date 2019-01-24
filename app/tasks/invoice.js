import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.INVOICE}`;

const parseInvoice = invoice => {
  // logger.info(JSON.stringify(invoice));
  return {
    header: [
      {
        label: 'Chrome_Entity',
        id: 'entityName',
        name: 'entityName',
        maxlength: '50',
        placeholder: 'Entity',
        type: 'text',
        value: invoice.entityName,
        readOnly: true
      },
      {
        label: 'PO Type',
        id: 'poFrom',
        name: 'poFrom',
        maxlength: '50',
        placeholder: 'PO',
        type: 'text',
        value: 'PO',
        readOnly: true
      },
      {
        label: 'Invoice #',
        id: 'invoiceNo',
        name: 'invoiceNo',
        maxlength: '50',
        placeholder: 'Invoice #',
        type: 'text',
        value: invoice.invoice ? invoice.invoice.invoiceNo : 0,
        readOnly: true
      },
      {
        label: 'Invoice Date',
        id: 'invoiceDate',
        name: 'invoiceDate',
        maxlength: '50',
        placeholder: 'Invoice Date',
        type: 'text',
        value: invoice.invoiceDate,
        readOnly: true
      },
      {
        label: 'Workflow',
        id: 'workflowName',
        name: 'workflowName',
        maxlength: '50',
        placeholder: 'Workflow',
        type: 'text',
        value: invoice.workflowName,
        readOnly: true
      },
      {
        label: 'Supplier',
        id: 'supplierName',
        name: 'supplierName',
        maxlength: '50',
        placeholder: 'Supplier',
        type: 'text',
        value: invoice.supplierName,
        readOnly: true
      },
      {
        label: 'PO',
        id: 'poNo',
        name: 'poNo',
        maxlength: '50',
        placeholder: 'PO',
        type: 'text',
        value: invoice.invoice ? invoice.invoice.invoiceLineItems[0].poNo : 0,
        readOnly: true
      },
      {
        label: 'Payment Terms(Days)',
        id: 'paymentDays',
        name: 'paymentDays',
        maxlength: '50',
        placeholder: 'Payment Terms(Days)',
        type: 'text',
        value: invoice.paymentDays,
        readOnly: true
      },
      {
        label: 'Credit Notes',
        id: 'creditNotes',
        name: 'creditNotes',
        type: 'select',
        value: invoice.creditNotes,
        readOnly: true,
        options: []
      }
    ],
    invoiceLineItems: !invoice.invoice ? [] : invoice.invoice.invoiceLineItems.map((x, y) => {
      return {
        header: x.itemDesc,
        lineItemId: x.invoiceLineItemId,
        receivedId: x.receivedId,
        itemId: x.itemId,
        desc: x.itemDesc,
        uom: x.uom,
        qty: x.qty,
        price: x.price,
        netPrice: x.netPrice,
        discount: x.discount,
        sgst: x.sgst,
        cgst: x.cgst,
        igst: x.igst,
        tax: x.taxAmt,
        totalAmount: x.totalAmt,
        otherTax: x.otherTax,
        taxName: x.taxName,
        poNo: x.poNo,
        itemNo: x.itemNo,
        supplierPartNo: x.supplierPartNo,
        supplierName: x.supplierName,
        qtyOrdered: x.qtyOrdered,
        taxAmt: x.taxAmt,
        totalAmt: x.totalAmt,
        sNo: (y + 1).toString(),
      };
    }),
    paymentTerms: invoice.invoice ? invoice.invoice.poRequesition.paymentTerms : '',
    comments: invoice.comments,
    invoiceId: invoice.invoice ? invoice.invoice.invoiceId : 0,
    workflowAuditId: invoice.workflowAuditId,
    taskId: invoice.taskId,
    seqFlow: invoice.seqFlow,
    auditTrackId: invoice.auditTrackId,
    processInstanceId: invoice.processInstanceId,
    invoiceNo: invoice.invoice ? invoice.invoice.invoiceNo : 0,
    invoiceDate: invoice.invoiceDate,
    workflowId: invoice.workflowId,
    supplierId: invoice.supplierId,
    requisitionId: invoice.invoice ? invoice.invoice.poRequesition.requisitionId : 0,
    companyId: invoice.companyId,
    subTotalAmt: invoice.invoice ? invoice.invoice.subTotalAmt : 0,
    additionalAmt: invoice.invoice ? invoice.invoice.additionalAmt : 0,
    adjustedAmt: invoice.invoice ? invoice.invoice.adjustedAmt : 0,
    discount: invoice.invoice ? invoice.invoice.discount : 0,
    grandTotal: invoice.invoice ? invoice.invoice.grandTotal : 0,
    entityId: invoice.entityId,
    entityName: invoice.entityName,
    requesterId: invoice.requesterId,
    poFrom: invoice.poFrom,
    paymentDays: invoice.paymentDays,
    creditNotes: invoice.creditNotes,
  };
};

const getInvoice = async (req, res, next) => {
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
      const invoice = await parseInvoice(response.data);
      res.status(200).json(invoice);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};

const updateInvoice = async (req, res, next) => {
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
      res.status(200).json(response.data);
    }
  } catch (err) {
    logger.info(err.toString());
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export {getInvoice, updateInvoice};

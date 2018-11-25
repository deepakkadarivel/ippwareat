import axios from "axios";
import logger from "../logger";
import constants from "../constants";

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.INVOICE}`;

const parseInvoice = invoice => {
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
        readOnly: true,
      },
      {
        label: 'PO Type',
        id: 'poFrom',
        name: 'poFrom',
        maxlength: '50',
        placeholder: 'PO',
        type: 'text',
        value: 'PO',
        readOnly: true,
      },
      {
        label: 'Invoice #',
        id: 'invoiceNo',
        name: 'invoiceNo',
        maxlength: '50',
        placeholder: 'Invoice #',
        type: 'text',
        value: invoice.invoice.invoiceNo,
        readOnly: true,
      },
      {
        label: 'Invoice Date',
        id: 'invoiceDate',
        name: 'invoiceDate',
        maxlength: '50',
        placeholder: 'Invoice Date',
        type: 'text',
        value: invoice.invoiceDate,
        readOnly: true,
      },
      {
        label: 'Workflow',
        id: 'workflowName',
        name: 'workflowName',
        maxlength: '50',
        placeholder: 'Workflow',
        type: 'text',
        value: invoice.workflowName,
        readOnly: true,
      },
      {
        label: 'Supplier',
        id: 'supplierName',
        name: 'supplierName',
        maxlength: '50',
        placeholder: 'Supplier',
        type: 'text',
        value: invoice.supplierName,
        readOnly: true,
      },
      {
        label: 'PO',
        id: 'poNo',
        name: 'poNo',
        maxlength: '50',
        placeholder: 'PO',
        type: 'text',
        value: invoice.invoice.invoiceLineItems[0].poNo,
        readOnly: true,
      },
      {
        label: 'Payment Terms(Days)',
        id: 'paymentDays',
        name: 'paymentDays',
        maxlength: '50',
        placeholder: 'Payment Terms(Days)',
        type: 'text',
        value: invoice.paymentDays,
        readOnly: true,
      },
      {
        label: 'Credit Notes',
        id: 'creditNotes',
        name: 'creditNotes',
        type: 'select',
        value: invoice.creditNotes,
        readOnly: true,
        options: [],
      },
    ]
  }
};

const getInvoice = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const { cookie, loadBalancer, payload } = req.body;

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
      const invoice = await parseInvoice(response.data);
      // logger.info(JSON.stringify(invoice));
      res.status(200).json(invoice);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export default getInvoice;

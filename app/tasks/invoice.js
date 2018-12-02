import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

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
        value: invoice.invoice.invoiceNo,
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
        value: invoice.invoice.invoiceLineItems[0].poNo,
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
    invoiceLineItems: invoice.invoice.invoiceLineItems.map((x, y) => {
      return {
        header: {
          label: 'Item',
          id: 'itemDesc',
          name: 'itemDesc',
          maxlength: '50',
          placeholder: '',
          type: 'text',
          value: x.itemDesc,
          readOnly: true
        },
        lines: [
          {
            label: 'S.NO',
            id: 'lineItemId',
            name: 'lineItemId',
            maxlength: '50',
            placeholder: y,
            type: 'text',
            value: (y + 1).toString(),
            readOnly: true
          },
          {
            label: 'PO #',
            id: 'poNo',
            name: 'poNo',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.poNo,
            readOnly: true
          },
          {
            label: 'Item #',
            id: 'itemNo',
            name: 'itemNo',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.itemNo,
            readOnly: true
          },
          {
            label: 'Supplier',
            id: 'supplierName',
            name: 'supplierName',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.supplierName,
            readOnly: true
          },
          {
            label: 'Supplier Part #',
            id: 'supplierPartNo',
            name: 'supplierPartNo',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.supplierPartNo,
            readOnly: true
          },
          {
            label: 'Qty Ordered',
            id: 'qtyOrdered',
            name: 'qtyOrdered',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.qtyOrdered,
            readOnly: true
          },
          {
            label: 'Qty Received',
            id: 'qty',
            name: 'qty',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.qty,
            readOnly: true
          },
          {
            label: 'UOM',
            id: 'uom',
            name: 'uom',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.uom,
            readOnly: true
          },
          {
            label: 'Price',
            id: 'price',
            name: 'price',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.price,
            readOnly: true,
            adornment: true
          },
          {
            label: 'Net Price',
            id: 'netPrice',
            name: 'netPrice',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.netPrice,
            readOnly: true,
            adornment: true
          },
          {
            label: 'Discount',
            id: 'discount',
            name: 'discount',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.discount,
            readOnly: true
          },
          {
            label: 'SGST %',
            id: 'sgst',
            name: 'sgst',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.sgst,
            readOnly: true
          },
          {
            label: 'CGST %',
            id: 'cgst',
            name: 'cgst',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.cgst,
            readOnly: true
          },
          {
            label: 'IGST %',
            id: 'igst',
            name: 'igst',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.igst,
            readOnly: true
          },
          {
            label: 'Tax',
            id: 'taxAmt',
            name: 'taxAmt',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.taxAmt,
            readOnly: true,
            adornment: true
          },
          {
            label: 'Total',
            id: 'totalAmt',
            name: 'totalAmt',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.totalAmt,
            readOnly: true,
            adornment: true
          }
        ]
      };
    }),
    prices: [
      {
        label: 'Sub Total',
        id: 'subTotalAmt',
        name: 'subTotalAmt',
        maxlength: '50',
        placeholder: 'Sub Total',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Shipping & Handling Charges',
        id: 'additionalAmt',
        name: 'additionalAmt',
        maxlength: '50',
        placeholder: 'Shipping & Handling Charges',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Adjust',
        id: 'adjustedAmt',
        name: 'adjustedAmt',
        maxlength: '50',
        placeholder: 'Adjust',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Discount',
        id: 'discount',
        name: 'discount',
        maxlength: '50',
        placeholder: 'Discount',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Grand Total',
        id: 'grandTotal',
        name: 'grandTotal',
        maxlength: '50',
        placeholder: 'Grand Total',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      }
    ],
    footer: [
      {
        label: 'Payment Terms',
        id: 'paymentTerms',
        name: 'paymentTerms',
        maxlength: '50',
        placeholder: 'Payment Terms',
        type: 'textArea',
        value: invoice.paymentTerms,
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Comments',
        id: 'comments',
        name: 'comments',
        maxlength: '50',
        placeholder: 'Comments',
        type: 'textArea',
        value: invoice.comments,
        readOnly: true,
        variant: 'outlined'
      }
    ]
  };
};

const getInvoice = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const { cookie, loadBalancer, payload } = req.body;

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

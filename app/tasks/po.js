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
      }
    ],
    poLineItems: po.poLineItems.map((x, y) => {
      return {
        header: {
          label: 'Item',
          id: 'itemDescription',
          name: 'itemDescription',
          maxlength: '50',
          placeholder: '',
          type: 'text',
          value: x.itemDescription,
          readOnly: true
        },
        lines: [
          {
            label: 'Line Item',
            id: 'lineItemId',
            name: 'lineItemId',
            maxlength: '50',
            placeholder: y,
            type: 'text',
            value: (y + 1).toString(),
            readOnly: true
          },
          {
            label: 'Category',
            id: 'categoryDesc',
            name: 'categoryDesc',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.categoryDesc,
            readOnly: true
          },
          {
            label: 'Sub Category',
            id: 'subCategoryDesc',
            name: 'subCategoryDesc',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.subCategoryDesc,
            readOnly: true
          },
          {
            label: 'Received Qty',
            id: 'receivedQty',
            name: 'receivedQty',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.receivedQty.toString(),
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
            label: 'Tax',
            id: 'tax',
            name: 'tax',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.tax,
            readOnly: true,
            adornment: true
          },
          {
            label: 'Total',
            id: 'totalAmount',
            name: 'totalAmount',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.totalAmount,
            readOnly: true,
            adornment: true
          },
          {
            label: 'Unit Price',
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
            label: 'Qty',
            id: 'quantity',
            name: 'quantity',
            maxlength: '50',
            placeholder: '',
            type: 'text',
            value: x.quantity,
            readOnly: false
          }
        ]
      };
    }),
    prices: [
      {
        label: 'Total NetPrice',
        id: 'poTotalNetPrice',
        name: 'poTotalNetPrice',
        maxlength: '50',
        placeholder: 'Net Price',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Total Tax',
        id: 'poTotalTax',
        name: 'poTotalTax',
        maxlength: '50',
        placeholder: 'Sub Total',
        type: 'text',
        value: '',
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Grand Total',
        id: 'totalAmount',
        name: 'poGrandTotal',
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
        label: 'Advance Payment %',
        id: 'advancePayment',
        name: 'advancePayment',
        maxlength: '50',
        placeholder: 'Advance Payment',
        type: 'text',
        value: po.advancePayment,
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Terms',
        id: 'terms',
        name: 'terms',
        maxlength: '50',
        placeholder: 'Advance Payment',
        type: 'textArea',
        value: po.terms,
        readOnly: true,
        variant: 'outlined'
      },
      {
        label: 'Payment Terms',
        id: 'paymentTerms',
        name: 'paymentTerms',
        maxlength: '50',
        placeholder: 'Payment Terms',
        type: 'textArea',
        value: po.paymentTerms,
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
        value: po.comments,
        readOnly: true,
        variant: 'outlined'
      }
    ],
    entityId: po.entityId,
    viewId: po.viewId,
    workflowId: po.workflowId,
    supplierId: po.supplierId,
    currency: po.currency
  };
};

const getPO = async (req, res, next) => {
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
      const po = await parsePo(response.data);
      logger.info(JSON.stringify(po));
      res.status(200).json(po);
      // res.status(200).json(response.data);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export default getPO;

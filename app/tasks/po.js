import axios from "axios";
import logger from "../logger";
import constants from "../constants";

const BASE_URL = process.env.BASE_URL;

const url = `${BASE_URL}${constants.url.PO}`;

const parseTasks = tasks => {
  return tasks.map(task => {
    return {
      workflowTypeName: task.workflowTypeName,
      workflowTypeId: task.workflowTypeId,
      supplierName: task.supplierName,
      stageName: task.stageName,
      contractNo: task.contractNo,
      contractOwner: task.contractOwner,
      requestedBy: task.requestedBy,
      poRequestNo: task.poRequestNo,
      poNo: task.poNo,
      pickUpRequestNo: task.pickUpRequestNo,
      invoiceNo: task.invoiceNo,
      assetRequestNo: task.assetRequestNo,
      customerPONo: task.customerPONo,
      customerInvoiceNo: task.customerInvoiceNo,
      quoteRequestNo: task.quoteRequestNo,
      indentRequestNo: task.indentRequestNo,
      travelRequestNo: task.travelRequestNo,
      claimRequestNo: task.claimRequestNo,
      createdDate: task.createdDate,
      dueDateString: task.dueDateString,
      status: task.status
    };
  });
};

const getPO = async (req, res, next) => {
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
      // const tasks = await parseTasks(response.data);
      // const tasks = {};
      // res.status(200).json(tasks);
      res.status(200).json(response.data);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};
export default getPO;

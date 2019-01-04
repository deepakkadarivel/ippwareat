import logger from "../logger";
import axios from "axios";
import constants from "../constants";

const BASE_URL = process.env.BASE_URL;

const getEntityDetails = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  const url = `${BASE_URL}${constants.url.ENTITY_DETAILS}`;
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
      const entityDetails = {
        viewList: response.data.viewList.map(view => {
          return {viewId: view.viewId, viewName: view.viewName}
        }), workflowList: response.data.workflowList.map(workflow => {
          return {
            workflowId: workflow.workflowId,
            workflowName: workflow.workflowName
          }
        })
      };
      res.status(200).json(entityDetails);
    }
  } catch (err) {
    if (err.toString() === constants.STATUS_401) {
      err.status = 401;
    }
    next(err);
  }
};

const getItemData = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  const url = `${BASE_URL}${constants.url.ENTITY_DETAILS}`;
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
const getExpenseGrid= async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  const url = `${BASE_URL}${constants.url.EXPENSE_GRID}`;
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

export {getEntityDetails, getItemData, getExpenseGrid};
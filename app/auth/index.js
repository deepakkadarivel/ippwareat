import axios from 'axios';
import logger from '../logger';
import constants from '../constants';

const BASE_URL = 'http://27.34.240.158:8088/SCM/api/';

const url = `${BASE_URL}/auth`;

const parseAuth = response => {
  const headers = response.headers['set-cookie'];
  const cookie = headers[0];
  const loadBalancer = headers[2];

  const data = response.data;
  const user = {
    emailId: data.user.contactDetail.emailId,
    firstName: data.user.contactDetail.firstName,
    lastName: data.user.contactDetail.lastName,
    mobileNo: data.user.contactDetail.mobileNo,
    phoneNo: data.user.contactDetail.phoneNo,
    userName: data.user.userName,
    loginTrackId: data.user.loginTrackId,
    userId: data.user.userId,
    orgUserMapping: data.user.orgUserMapping.map(org => {
      return {
        orgId: org.organization.orgId,
        name: org.organization.name,
        orgCurrency: org.organization.orgCurrency
      };
    })
  };
  const alias = {
    viewAlias: data.currentOrganization.viewAlias || 'View',
    entityAlias: data.currentOrganization.entityAlias || 'Entity'
  };

  return {
    cookie,
    loadBalancer,
    user,
    alias
  };
};

const login = async (req, res, next) => {
  logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
  try {
    const { userName, password } = req.body;
    const response = await axios.post(url, { userName, password });
    if (!response.data.user) {
      let err = new Error(constants.INVALID_USER);
      err.status = 401;
      next(err);
    } else {
      const auth = await parseAuth(response);
      res.status(200).json(auth);
    }
  } catch (error) {
    next(error);
  }
};
export default login;

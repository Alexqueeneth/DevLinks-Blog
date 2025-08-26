import { Router } from 'express';
import { sendResponse } from '../common/utils.common.js';

const baseRouter = Router();

baseRouter.get('/', (req, res) => sendResponse(res, 200, true, 'API is running'));

export default baseRouter;
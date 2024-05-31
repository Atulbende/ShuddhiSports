import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {com_delete,com_list} from '../controllers/common/common.js'
const router=Router();
router.route('/com_delete').post(auth,com_delete);
router.route('/com_list').get(com_list);
export default router;

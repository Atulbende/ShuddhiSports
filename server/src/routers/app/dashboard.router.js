import Router from 'express'
import { auth } from '../../middleware/auth.middleware.js';
import { Dashboard } from '../../controllers/app/dashboard.controllers.js';
const router=Router();
router.route('/Dashboard').post(Dashboard);
 export default router;

 
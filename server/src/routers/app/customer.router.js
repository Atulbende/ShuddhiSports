import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { CustomerSave ,openCustomer, getGridCustomers} from "../../controllers/app/customer.controllers.js";
const router=Router();
router.route('/customerSave').post(CustomerSave);
router.route('/getGridCustomers').get(auth,getGridCustomers)
router.route('/openCustomer').post(openCustomer)
export default router;
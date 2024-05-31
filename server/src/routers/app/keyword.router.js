import { Router } from "express";
import { categorySave,getGridCategorys,openCategory,brandSave,getGridBrands,openBrand } from "../../controllers/app/keyword.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router=Router();

// router.route('/keywords').post(auth,keywords);
router.route('/categorySave').post(auth,categorySave);
router.route('/getGridCategorys').post(auth,getGridCategorys);
router.route('/openCategory').post(auth,openCategory);
router.route('/brandSave').post(auth,brandSave);
router.route('/getGridBrands').post(auth,getGridBrands);
router.route('/openBrand').post(auth,openBrand);


export default router;

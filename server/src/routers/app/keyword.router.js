import { Router } from "express";
import { categorySave,getGridCategorys,openCategory,
    brandSave,getGridBrands,openBrand,
    sizeSave,getGridSizes,openSize } from "../../controllers/app/keyword.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router=Router();

// router.route('/keywords').post(auth,keywords);
// Category
router.route('/categorySave').post(auth,categorySave);
router.route('/getGridCategorys').post(auth,getGridCategorys);
router.route('/openCategory').post(auth,openCategory);
// Brand
router.route('/brandSave').post(auth,brandSave);
router.route('/getGridBrands').post(auth,getGridBrands);
router.route('/openBrand').post(auth,openBrand);
// Size
router.route('/sizeSave').post(auth,sizeSave);
router.route('/getGridSizes').post(auth,getGridSizes);
router.route('/openSize').post(auth,openSize);


export default router;

import { Router } from "express";
import { userLogin,userSinghUp,userLogOut, refreshSession,getRoles,getGridUsers,openUser,saveUser } from "../controllers/user/user.controller.js";
import {auth} from '../middleware/auth.middleware.js'

const router=Router();
router.route('/login').post(userLogin) ;
router.route('/logout').post(auth,userLogOut) ;
router.route('/singup').post(userSinghUp);
router.route('/refreshSession').post(refreshSession) ;
router.route('/getRoles').get(auth,getRoles);
router.route('/getGridUsers').get(auth,getGridUsers);
router.route('/openUser').post(auth,openUser);
router.route('/saveUser').post(auth,saveUser);
export default router;
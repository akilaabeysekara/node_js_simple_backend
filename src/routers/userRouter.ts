import {Router} from 'express'; 
import { saveUser,updateUser, getAllUser,deleteUser} from "../controllers/userController"; 

const router = Router();

router.post("/",saveUser);
router.get("/",getAllUser);
router.put("/",updateUser); 
router.delete("/",deleteUser); 

export default router; 

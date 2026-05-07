//customer.router.ts
// customerRouter.ts

import {Router} from 'express';
import { saveCustomer, getAllCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController"; // Import controller functions for handling customer-related requests

const router = Router(); // Create a new router instance

router.post("/",saveCustomer);  
router.get("/",getAllCustomer);
router.put("/",updateCustomer); 
router.delete("/",deleteCustomer); 

export default router; // Export the router for use in other parts of the application
//export default router; cant be used because we have to export the router 
// with the routes defined in it. So we will export the router with the routes defined in it. 


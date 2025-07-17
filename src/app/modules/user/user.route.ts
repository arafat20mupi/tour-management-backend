import { Router } from "express";
import userController from "./user.controller";
import { createZodSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";



const router = Router();


router.post("/register", validateRequest(createZodSchema), userController.createUser);
router.get("/all-users", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.getUser);
router.patch("/:id", checkAuth(...Object.values(UserRole)) , userController.updateUser)

const userRoutes = router;
export default userRoutes;

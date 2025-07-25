import { Router } from "express";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router()



router.post("/register",
    // validateRequest(createUserZodSchema),
    UserControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers)
router.get("/:id", checkAuth(...Object.values(Role)), UserControllers.getSingleUser)
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/v1/user/:id
export const UserRoutes = router
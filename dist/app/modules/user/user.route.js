"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validation_1 = require("./user.validation");
const validateRequest_1 = require("../../middleware/validateRequest");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createZodSchema), user_controller_1.default.createUser);
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.SUPER_ADMIN), user_controller_1.default.getUser);
router.patch("/:id", (0, validateRequest_1.validateRequest)(user_validation_1.updateZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), user_controller_1.default.updateUser);
const userRoutes = router;
exports.default = userRoutes;

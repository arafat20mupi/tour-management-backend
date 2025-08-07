import express from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.get(
    "/booking",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    StatsController.getBookingStats
);
router.get(
    "/payment",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    StatsController.getPaymentStats
);
router.get(
    "/user",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    StatsController.getUserStats
);
router.get(
    "/tour",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    StatsController.getTourStats
);

export const StatsRoutes = router;

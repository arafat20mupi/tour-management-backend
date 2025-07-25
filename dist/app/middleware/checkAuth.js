"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../utilis/jwt");
const AppHelpers_1 = __importDefault(require("../errorHelpers/AppHelpers"));
const env_1 = require("../config/env");
const user_schema_1 = __importDefault(require("../modules/user/user.model"));
const user_interface_1 = require("../modules/user/user.interface");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppHelpers_1.default(http_status_codes_1.default.BAD_REQUEST, "No Token Recieved");
        }
        const verifyToken = (0, jwt_1.verifiedToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        const isUserExist = yield user_schema_1.default.findOne({ email: verifyToken.email });
        if (!isUserExist) {
            throw new AppHelpers_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED || isUserExist.isActive === user_interface_1.IsActive.INACTIVE) {
            throw new AppHelpers_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppHelpers_1.default(http_status_codes_1.default.BAD_REQUEST, "User is deleted");
        }
        if (!authRoles.includes(verifyToken.role)) {
            console.log(authRoles.includes(verifyToken.role));
            throw new AppHelpers_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not promoted in this user");
        }
        req.user = verifyToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;

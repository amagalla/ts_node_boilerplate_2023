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
const express_1 = __importDefault(require("express"));
const registeration_1 = require("../../controller/registeration");
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
/**
 * @swagger
 *
 * definitions:
 *      RegisterUser:
 *          type: object
 *          description: User's information
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: John
 *              last_name:
 *                  type: string
 *                  example: Doe
 *              email:
 *                  type: string
 *                  example: email@a1.test
 *              password:
 *                  type: string
 *                  example: abc123
 *      UpdateUser:
 *          type: object
 *          description: User's information
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: Asuna
 */
/**
 * @swagger
 *
 *  /api/profiles/register:
 *
 *  post:
 *      description: Register a new User
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: User to register
 *            description: The user's information
 *            required: true
 *            schema:
 *              $ref: '#/definitions/RegisterUser'
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Registration failed
 */
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp, error;
    const reqBody = req.body;
    if (Object.keys(reqBody).length === 0) {
        error = new Error("Body data is required");
        error.status = 400;
        return next(error);
    }
    try {
        resp = yield (0, registeration_1.registerUser)(reqBody);
    }
    catch (err) {
        return next(new Error(error === null || error === void 0 ? void 0 : error.message));
    }
    if (resp.error) {
        error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }
    res.status(200).send(resp);
}));
/**
 * @swagger
 *
 *  /api/profiles/login:
 *
 *  get:
 *      description: Get all registered users
 *      responses:
 *          200:
 *              description: Received all users
 *          400:
 *              description: Failed to get users
 */
router.get("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp, restResp;
    try {
        [resp, restResp] = yield Promise.all([
            (0, registeration_1.getUser)(),
            axios_1.default.get("https://api.sampleapis.com/csscolornames/colors"),
        ]);
    }
    catch (err) {
        return next(new Error(err.message || "An error occurred"));
    }
    if (resp.error) {
        return next(new Error(resp.error));
    }
    const result = {
        profile: resp,
        colors: restResp.data.slice(0, 10),
    };
    return res.status(200).send(result);
}));
/**
 * @swagger
 *
 *  /api/profiles/deleteUser/{id}:
 *
 *  delete:
 *      description: Delete a User
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The id of a user
 *            required: true
 *            type: number
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          400:
 *              description: User deletion failed
 */
router.delete("/deleteUser/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield (0, registeration_1.deleteUser)(Number(req.params.id));
    }
    catch (err) {
        return next(new Error(err));
    }
    if (resp.error) {
        const error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }
    return res.status(200).send(resp);
}));
/**
 * @swagger
 *
 *  /api/profiles/updateUser/{id}:
 *
 *  patch:
 *      description: Update User First Name
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: Name to replace first name
 *            description: The user's first name
 *            required: true
 *            schema:
 *              $ref: '#/definitions/UpdateUser'
 *          - in: path
 *            name: id
 *            description: The id of a user
 *            required: true
 *            type: number
 *      responses:
 *          200:
 *              description: User first name updated successfully
 *          400:
 *              description: User first name update failed
 */
router.patch("/updateUser/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        resp = yield (0, registeration_1.updateUser)(Number(req.params.id), req.body.first_name);
    }
    catch (err) {
        return next(new Error(err));
    }
    if (resp.error) {
        const error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }
    return res.status(200).send(resp);
}));
exports.default = router;

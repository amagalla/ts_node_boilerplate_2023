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
exports.updateUser = exports.deleteUser = exports.getUser = exports.registerUser = void 0;
const mysql_config_1 = __importDefault(require("../db/mysql.config"));
const registerUser = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password } = profile;
    const registerQuery = `INSERT INTO profiles 
        (first_name, last_name, email, password)
        VALUES 
        (?, ?, ?, ?)`;
    try {
        yield mysql_config_1.default.query(registerQuery, [first_name, last_name, email, password]);
    }
    catch (err) {
        return {
            error: err,
        };
    }
    return {
        success: "User registered",
    };
});
exports.registerUser = registerUser;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const getUserQuery = "SELECT * FROM profiles";
    let resp;
    try {
        resp = yield mysql_config_1.default.query(getUserQuery);
    }
    catch (err) {
        return {
            error: err,
        };
    }
    return resp[0];
});
exports.getUser = getUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUserQuery = "DELETE FROM profiles WHERE id = ?";
    let resp;
    try {
        resp = yield mysql_config_1.default.query(deleteUserQuery, [id]);
    }
    catch (err) {
        return {
            error: err,
        };
    }
    if (resp[0].affectedRows === 0) {
        return {
            error: "Account already deleted",
        };
    }
    return {
        success: "Account deleted",
    };
});
exports.deleteUser = deleteUser;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserQuery = "UPDATE profiles SET first_name = ? WHERE id = ?";
    let resp;
    try {
        resp = yield mysql_config_1.default.query(updateUserQuery, [body, id]);
    }
    catch (err) {
        return {
            error: err,
        };
    }
    if (resp[0].affectedRows === 0) {
        return {
            error: "Account not found",
        };
    }
    return {
        success: "User updated",
    };
});
exports.updateUser = updateUser;

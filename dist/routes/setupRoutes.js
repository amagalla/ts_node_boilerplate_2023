"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function setupRoutes(app) {
    const apiRoutesDir = path_1.default.join(__dirname, "api");
    fs_1.default.readdirSync(apiRoutesDir).forEach((file) => {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
            const routePath = path_1.default.join(apiRoutesDir, file);
            const route = require(routePath).default; // Import the module and access the default export.
            const routeName = path_1.default.basename(routePath, path_1.default.extname(routePath));
            app.use(`/api/${routeName}`, route);
        }
    });
}
exports.default = setupRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
// swagger initialization
const swaggerFile = fs_1.default.readFileSync("./app/lib/config/swaggerOptions.yml", "utf-8");
const options = js_yaml_1.default.load(swaggerFile);
const docs = (0, swagger_jsdoc_1.default)(options);
// Express server setup
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT || 3000;
// error handler
const error_handler_1 = __importDefault(require("./error-handling/error-handler"));
// parsers
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// swagger doc route
app.use("/admin/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs));
// routes imports
const setupRoutes_1 = __importDefault(require("./routes/setupRoutes"));
(0, setupRoutes_1.default)(app);
app.use(error_handler_1.default);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

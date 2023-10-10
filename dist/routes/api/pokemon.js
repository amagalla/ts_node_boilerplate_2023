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
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     description: Get list of Pokemon
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokeData = yield axios_1.default.get("https://pokeapi.co/api/v2/pokemon");
        const pokemon = pokeData.data.results.map((poke) => poke.name);
        res.status(200).send(pokemon);
    }
    catch (err) {
        const error = new Error("Error getting pokemon");
        error.status = 400;
        return next(error);
    }
}));
exports.default = router;

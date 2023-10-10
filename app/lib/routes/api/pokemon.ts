import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

const router = express.Router();

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
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokeData = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemon = pokeData.data.results.map((poke: { name: string }) => poke.name);
    res.status(200).send(pokemon);
  } catch (err) {
    const error = new Error("Error getting pokemon");
    (error as any).status = 400;
    return next(error);
  }
});

export default router;

const { Router } = require('express');
const router = Router();
const { Pokemon, Types } = require("../db");
const axios = require("axios").default;
const pokemonRouter = require("./pokemon.js")
const typeRouter = require("./types.js")



router.use("/pokemon", pokemonRouter)
router.use("/types", typeRouter)

module.exports = router;
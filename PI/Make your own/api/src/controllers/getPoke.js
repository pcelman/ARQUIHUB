const { Router } = require('express');
const router = Router();
const { Pokemon, Types } = require("../db");
const axios = require("axios").default;
const { Op } = require("sequelize")



const pokeApi = async () =>{ 
    try {
const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
const pokeUrl = apiUrl.data.results.map(e => axios.get(e.url)) 
const pokeInfo = await axios.all(pokeUrl)
.then (pokes =>
    pokes.map(p => {
        const allPoke={
            id: p.data.id,
            name: p.data.name,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            types: p.data.types.map(t=>t.type),
            image: p.data.sprites.other.home.front_default,
        }
        
        return allPoke;
        
    }))
    return pokeInfo
    } catch (error) {
        console.log(error)
    }}


const dataBasePoke = async() => {
    try {
        const pokeDb = await Pokemon.findAll({
        include:{
            model: Types,
            attributes: ["name"],
            through: {
                attributes: [], 
            }
        },
    })


return pokeDb 
} catch(error) {
    console.log(error)
}}

    const dBApiPokes = async() => {
        const apiPokes = await pokeApi()
        const dbPokes = await dataBasePoke()
        const totalPokes =apiPokes.concat(dbPokes)
        return totalPokes
        }

module.exports = dBApiPokes
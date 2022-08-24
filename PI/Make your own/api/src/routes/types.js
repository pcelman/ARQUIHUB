const  {Types}  = require("../db.js");
const  {Router}  = require("express");
const axios = require("axios").default;
const router = Router();



router.get('/', async (req, res) =>{
  const url = await axios.get("https://pokeapi.co/api/v2/type")
  console.log(url.data)
  const nameType = await url.data.results.map(e=>e.name)
      for (const type of nameType) {
          Types.findOrCreate({where:{name:type}})              
      }
const allTipos  = await Types.findAll()   
try {
res.status(200).send(allTipos)
} catch (error) {
 console.log(error)
}
})
        






module.exports = router;

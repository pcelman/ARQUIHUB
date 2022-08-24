const { Pokemon, Types } = require("../db");
const  Router  = require("express");
const router = Router();
const  dBApiPokes   = require("../controllers/getPoke")






router.get("/", async (req, res) => {
  
    const poke = await dBApiPokes()
    const name = req.query.name

    if (name){ 
      const namePoke = poke.filter(poke => poke.name.toLowerCase() === name.toLowerCase() )
      if(namePoke) {
      res.status(200).send(namePoke)
    }}
    else res.status(200).send(poke)

})



router.get("/:id", async (req, res) => {
  try {
    const poke = await dBApiPokes()
    const {id} = req.params
    if (id){
      const pokeId = poke.filter(poke => poke.id == id )
    if(pokeId) {
      res.status(200).send(pokeId)
    }}
  } catch(error){
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types} = req.body;
  try {
  
     const newPokemon = await Pokemon.create({
       name, hp, attack, defense, speed, height, weight, image, createdInDb: true
      })                     
      console.log(newPokemon)

   const typeDb = await Types.findAll({
     where: {name: types}
    })
    console.log(typeDb)
    newPokemon.addTypes(typeDb)
   res.status(200).send("You have created a new pokemon")

 } catch(error) {
    console.log(error)
   res.status(400).send("Something went wrong")
 }
}) 





module.exports = router;

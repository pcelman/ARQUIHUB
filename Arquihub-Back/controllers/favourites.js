const { postModel,usersModel} = require("../models");

const updateFavourites = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      user_id
    } = req.body;
    if(!id||!user_id)return res.status(404).send({err:"requiered id of user and post to add of favourite"})
    const user = await usersModel.findOne({_id:user_id});
    await postModel.findOne({_id:id});
  const favouriteRepeat = user.favourites.find( e=>  e.equals(id))?true:false
/*   console.log(user.favourites.find(e=> e.equals(id))) */
      if(favouriteRepeat)return res.status(404).send({err:"the post to add to favourite is repeated"})
      await usersModel.updateOne({_id:user_id},
        { $push: { favourites: id } },
        { new: true, useFindAndModify: false }
      );
    res.status(200).send({success:"post successfully added to favourites"});
  } catch (err) {
    res.status(404).send({err: err.message});
  }
};


const deleteFavourites = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      user_id
    } = req.body;
    console.log(user_id)
    if(!id||!user_id)return res.status(400).send({err:"requiered id of user and post to delete of favourites"})
    await usersModel.findOne({_id:user_id});
    await postModel.findOne({_id:id});
    await usersModel.updateOne({_id:user_id},
      { $pull: { favourites: id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send({success:"user successfully deleted to the project"});
  } catch (err) {
    res.status(400).send({err: err.message});
  }
};

module.exports = { updateFavourites, deleteFavourites } 

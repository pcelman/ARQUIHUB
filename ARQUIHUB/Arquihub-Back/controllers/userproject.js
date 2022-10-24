const { projectModel,usersModel} = require("../models");
const emailer = require("../config/emailer")

const updateUserProject = async (req, res) => {
  const { id } = req.params;
  const { 
    user_id
  } = req.body;
  console.log("userId",user_id);
  console.log("projectid", id);
  try {
    if(!id||!user_id)return res.status(400).send({err:"requiered id of project and user to add"})
    const project = await projectModel.findOne({_id:id});
    await usersModel.findOne({_id:user_id});
  const userRepeat = project.users.find( e=>  e.equals(user_id))?true:false
  console.log(userRepeat)
      if(userRepeat)return res.status(404).send({err:"the user to add is repeated"})
      await projectModel.updateOne({_id:id},
        { $push: { users: user_id } },
        { new: true, useFindAndModify: false }
      );
      await usersModel.updateOne({_id:user_id},
        { $push: {projects: id } },
        { new: true, useFindAndModify: false }
      );


      const user = await usersModel.findOne({id: id }) || await usersModel.findOne({id:user_id })
       const addedUser = user.email

      emailer.sendMail(addedUser,`You have been added to a new project!`, `<div><p>${user.name} , You have been added to project ${project.title} <a href = https://arquihub.vercel.app/projectDetail/${id}> link </a></p></div`)

    res.status(200).send({success:"user successfully added to the project"});
  } catch (err) {
    res.status(404).send({err: err.message});
  }
};


const deleteUserProject = async (req, res) => {
  const { id } = req.params;
  const { 
    user_id
  } = req.body;
  try {
    if(!id||!user_id)return res.status(404).send({err:"requiered id of project and user to delete"})
    const project = await projectModel.findOne({_id:id});
    await projectModel.findOne({_id:id});
    await usersModel.findOne({_id:user_id});
    await projectModel.updateOne({_id:id},
        { $pull: { users: user_id } },
        { new: true, useFindAndModify: false }
      );
      await usersModel.updateOne({_id:user_id},
        { $pull: {projects: id } },
        { new: true, useFindAndModify: false }
      );

      const user = await usersModel.findOne({id: id }) || await usersModel.findOne({id:user_id })
      const addedUser = user.email

     emailer.sendMail(addedUser,`You have been removed from a project!`, `<div><p>${user.name} , You have been removed from the project ${project.title} <a href = https://arquihub.vercel.app/projectDetail/${id}> link </a></p></div`)



    res.status(200).send({success:"user successfully deleted to the project"});
  } catch (err) {
    res.status(404).send({err: err.message});
  }
};

module.exports = { updateUserProject, deleteUserProject } 

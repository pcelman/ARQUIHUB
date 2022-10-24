const { usersModel, reviewModel, projectModel } = require("../models");
const emailer = require("../config/emailer");
const bannedTemplate = require("../templates/banned");

const getUsers = async (req, res) => {
  try {
    const allUsers = await usersModel.find({});
    res.send(allUsers);
  } catch (error) {
    res.status(400).send("Cant find users");
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      favourites,
      status,
      job,
      description,
      page,
      location,
      premium,
    } = req.body;
    console.log(name, lastname, nickname, description);
    if (!name || !lastname || !nickname || !email || !password)
      return res.status(400).send("Missing required parameters");

    const newUser = {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      favourites,
      status,
      job,
      description,
      page,
      location,
      premium: false,
    };

    await usersModel.create(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      projects,
      favourites,
      status,
      job,
      description,
      page,
      location,
      premium,
      avatar,
    } = req.body;
    const editedUser = {
      name,
      lastname,
      nickname,
      email,
      password,
      type,
      projects,
      favourites,
      status,
      job,
      description,
      page,
      location,
      premium,
      avatar,
    };

    const user = await usersModel.findById(id);
    // if(status === "inactive"){
    //   emailer.sendMail(user.email, name ? `${name}, Welcome to Arquihub!` : `${nickname}, Your account is now inactive`,
    //   `${name} Your account is now off, comeback anytime!`)}
    if (editedUser.status === "active") {
      await usersModel.updateOne({ _id: id }, editedUser);
      emailer.sendMail(
        user.email,
        `Your account has been reestablished!`,
        `Your account is now activated from the ban, welcome back!`
      );
      res.status(200).json(editedUser);
    } else if (editedUser.status === "banned") {
      emailer.sendMail(user.email, "Banned account", bannedTemplate);

      await usersModel.updateOne({ _id: id }, editedUser);
      res.status(200).json(editedUser);
    } else if (editedUser.status === "inactive") {
      emailer.sendMail(
        user.email,
        editedUser.name
          ? `${editedUser.name}, Welcome to Arquihub!`
          : `${newUser.nickname}, Your account is now inactive`,
        `${editedUser.name} Your account is now off, comeback anytime!`
      );
      await usersModel.updateOne({ _id: id }, editedUser);
      res.status(200).json(editedUser);
    } else {
      await usersModel.updateOne({ _id: id }, editedUser);
      return res.status(200).json({ _id: user._id });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.deleteOne({ _id: id });
    res.send("user deleted");
  } catch (error) {
    res.status(400).send("Failed to delete user");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const allUsers = await usersModel.aggregate([
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "user_id",
          as: "payments",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "user_id",
          as: "reviews",
        },
      },
    ]);

    const usersProjects = await usersModel.populate(allUsers, {
      path: "projects",
      populate: { path: "pdf_file" },
    });
    const usersPosts = await usersModel.populate(usersProjects, {
      path: "posts",
    });
    const usersFavourites = await usersModel.populate(usersPosts, {
      path: "favourites",
    });
    const getUser = usersFavourites.find((e) => e._id == id);
    const reviews = await reviewModel
      .find({ user_id: getUser._id })
      .populate("post_id");
    res.status(200).json({ ...getUser, reviews: reviews });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };

const { storageModel } = require("../models/index");
const PUBLIC_URL = process.env.PUBLIC_URL;
const fs = require('fs')

const getStorages = async (req, res) => {
  try {
    const allStorages = await storageModel.find({});
    res.status(200).json(allStorages);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
const createStorage = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}${file.filename}`,
      originalname: file.originalname
    };
    const newStorage = await storageModel.create(fileData);
    res.status(200).send({ newStorage });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
const getStorageById = async (req, res) => {
  try {
    const { id } = req.params;
    const searchStorage = await storageModel.findOne({ _id: id });
    res.status(200).send(searchStorage);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteStorage = async (req, res) => {
  try {
    const { id } = req.params;
    const searchStorage = await storageModel.findOne({ _id: id });
    const pathStorage = `${__dirname}/../storage/${searchStorage.filename}`;
    if (pathStorage) {
      fs.unlinkSync(pathStorage)
    }
    await storageModel.deleteOne({ _id: id });
    res.send("storage deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStorages,
  createStorage,
  getStorageById,
  deleteStorage
};

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Me dirijo a la carpeta donde quiero guardar el archivo.
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    //Obtengo la extension(en este caso va a ser .dwg y .pdf).
    const ext = file.originalname.split(".").pop();
    //Genero un numero diferente por si el file se repite.
    const fileName = `file-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;

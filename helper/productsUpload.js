const multer = require('multer')
const path = require('path')
const dir = path.join(__dirname, '../files/products/')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname
        req.body.image = fileName
        cb(null, fileName);
      }
});

const upload = multer({ storage: storage});

module.exports = upload




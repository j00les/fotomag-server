const multer = require('multer')


const storage = multer.diskStorage({})
let upload = multer({
    storage
})



module.exports = upload
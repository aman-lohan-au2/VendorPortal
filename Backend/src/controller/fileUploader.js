const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())                 // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


const storage = multer.diskStorage({
    destination:'../public/uploads',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

app.use(multer({
    storage: storage
}
).single("file"))

app.use(express.static('../public/upload'));


 function upload(req,res){
    try{
        console.log(req.body)

    }
     catch(err){
         console.log(err)
     }
}


module.exports = {upload}
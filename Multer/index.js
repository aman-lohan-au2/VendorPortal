const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // function checkFileType(file, cb){
  //   // Allowed ext
  //   const filetypes = /jpeg|jpg|png|gif/;
  //   // Check ext
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   // Check mime
  //   const mimetype = filetypes.test(file.mimetype);
  
  //   if(mimetype && extname){
  //     return cb(null,true);
  //   } else {
  //     cb('Error: Images Only!');
  //   }
  // }
  

app.use(multer({
    storage: storage
}
).single("file"))


// const upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, cb){
//       checkFileType(file, cb);
//     }
//   }).single('myImage');

// Public Folder

app.use(express.static('./public/upload'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {

  try{
    res.send("Data Entered")
    console.log(req.file)
  }
  catch(err){
    console.log(err)
  }

});
// app.get('/photos',(req,res)=>{
//   res.send(path)
// });

const port = 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
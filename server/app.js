require("dotenv").config();
const cors = require('cors');
const express = require("express");
// const app = express.app();
const app = express();
const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
const path = require('path');
const Register = require("./db");
// const conn = require("./db");
const bcrypt = require("bcryptjs");
// const upload = multer({dest:"uploads/"})
app.use(cors());
// app.use(require('./app/app'));
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"../client/src/uploads");
    },
    filename: function(req,file,cb){
        const ext = file.originalname.split(".").pop();
        const filename = `${Date.now()}-${file.fieldname}.${ext}`;
        return cb(null, filename);
    },
});
const upload = multer({ storage: storage });
app.get("/",(req,res)=>{
    res.send("Hello");
})
// app.use(cors());
app.use(express.json());
app.post("/register",async(req,res)=>{
    try {
        const register = new Register({
            firstname :req.body.firstname,
            lastname :req.body.lastname,
            phoneno :req.body.phoneno,
            password : req.body.password,
        })

        console.log("done");
        await register.save();
        res.status(201).json({
            message: 'Saved successfully!'
        });
    } catch (error) {
        console.log(error);
    }
    console.log("Saved");
})

app.post("/signin",async(req,res)=>{
    try {
        const phoneno = req.body.phoneno;
        const password = req.body.password;
        console.log("reveived");
        const e_data = await Register.findOne({phoneno:phoneno});
        if(e_data){
        console.log(e_data);
        }
        else{
            res.status(400);
        }
        console.log("phonefound");
        const isMatch = await bcrypt.compare(password,e_data.password);
        console.log(isMatch);
        console.log("passwordmatched");
        res.status(201).json({
            message: 'LogedIn successfully!'
        });

// // ----------------------------------------------TOKEN-----------------------------------------------------------

        // const token = dundh.getToken();

// // ----------------------------------------------TOKEN-----------------------------------------------------------

        
    } catch (error) {
        console.log(error);
    }
})
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: "mongodb://127.0.0.1:27017/first",
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads'
//     };
//   }
// });
// const upload = multer({ storage });

// // Route to upload file
app.post('/upload', upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    Register.create({file: req.file.filename}).then(()=>{
        console.log("Database Updated")
    }).catch((err)=>{
        console.log(err);
    })

    return res.redirect("/");
  res.json({ file: req.file });
});
app.get('/getImage',async(req,res)=>{
    console.log("Fetching IMAGES");
    const data = await Register.find({});
    res.status(201).send(data);
})

// // Route to get all files
// app.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     if (!files || files.length === 0) {
//       return res.status(404).json({ message: 'No files found' });
//     }
//     return res.json(files);
//   });
// });

// // Route to get a specific file by filename
// app.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });


app.listen(8000,()=>{
    console.log("Listining to port 8000");
})
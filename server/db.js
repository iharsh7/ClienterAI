const mongoose = require("mongoose");
const conn = mongoose.connect("mongodb://127.0.0.1:27017/first").then(()=>console.log("connection established")).catch((e)=>console.log(e));
const bcrypt = require("bcryptjs");
const firstSchema = new mongoose.Schema({
    firstname:{
        type:String,
        // required:true
    },
    lastname:{
        type:String,
        // required:true
    },
    phoneno:{
        type:Number,
        // unique:true
    },
    password:{
        type:String
    },
    // tokens:[{
    //     tokens:{
    //         type:String,
    //         required:true
    //     }
    // }]
    file:{
        type:String
    },
})

    firstSchema.pre("save",async function(next){
        if(this.isModified("password")){
            this.password  = await bcrypt.hash(this.password,10);
           }
        next();
    })
const Register = new mongoose.model("Register",firstSchema);
module.exports = Register,conn;
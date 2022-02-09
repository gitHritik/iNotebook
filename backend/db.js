const mongoose = require("mongoose");
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"




const connectTomongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successfully");
    })
}

module.exports = connectTomongo;
const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/Notebook?directConnection=true";

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl,()=>{
        console.log("Connected to Mongo Successfully");
    });
}

module.exports = connectToMongo;


const mongoose = require ('mongoose');
const mongoURI =  "mongodb://localhost:27017/NoteBuddy";
  const connectToMongo=()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo succesfully")
    })
  }
 
 module.exports = connectToMongo;
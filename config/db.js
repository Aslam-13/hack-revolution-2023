const mongoose = require('mongoose');


mongoose.set("strictQuery", false);

const connectDB = async ()=>{
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });
  console.log(`mongodb connected ${conn.connection.host}`.cyan.underline.bold);
};


module.exports = connectDB;
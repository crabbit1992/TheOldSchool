const mongoose=require('mongoose'); 

const {database} =require('./keys');

mongoose.connect(database.uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err));

module.exports=mongoose;
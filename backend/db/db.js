const mongoose = require('mongoose');

connectDatabase = () => {mongoose.connect(process.env.DB_URI,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
})
}

module.exports = connectDatabase;





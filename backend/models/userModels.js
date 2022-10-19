const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//creating userSchema
const userSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: [true, "Please Enter Your Name"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    phone:{
        type:Number,
        required: [true, "Please Enter Your Phone Number"]
    },
    password:{
        type:String,
        required: [true, "Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"]
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
});




//hashing password

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);

})



//jwt token
userSchema.methods.generateAuthToken = async function ()  {
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = new mongoose.model("User", userSchema);



module.exports = User;
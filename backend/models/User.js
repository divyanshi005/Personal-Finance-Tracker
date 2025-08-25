const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const UserSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImageUrl:{type:String,default:null},
},
    {timestamps:true}
);


//hash passowrds before saving
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    
    this.password=await bcrypt.hash(this.password,10);
    
    next();
});

//compare passwords
UserSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

module.exports=mongoose.model("User",UserSchema);
/*
    bcrypt.hash(plainPassword, saltRounds)

plainPassword: The original password.

saltRounds: Higher = more secure but slower. 10 is standard.
ODM (Mongoose) = Backend, DB mapping.

DOM = Frontend, HTML structure manipulation.
pre("save") → A middleware that runs before saving a document to the database.

async function(next):

async: Allows you to use await inside the function (e.g., for bcrypt.hash() which returns a Promise).

next (callback): A function you must call when your middleware work is finished so Mongoose can continue saving the document.

Why next()?

Without calling next(), the save operation will be stuck forever.

next() tells Mongoose → “I’m done with this middleware, move to the next step.”
    */
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {UserInputError}=require("express-graphql");
const User=require('../../model/Staff');
const {validateRegisterInput,validateLoginInput}=require('../../util/validators')
const {SECRET_KEY}=require("../../config");

//token genarate for authentication
function genarateToken(user){
   return jwt.sign({
       id:user.id,
       email:user.email,
       name:user.name  

   },SECRET_KEY,{expiresIn:'1h'});
  
}

module.exports={
   Mutation:{ async createUser({input:{id,name,email,password,confirmPassword}}) {

             //Validate user data
        const {valid ,errors}=validateRegisterInput(name,email,password,confirmPassword)
               if (!valid) {
           throw new UserInputError("errors",{errors});
        }
        //make sure user doesnt exist
        const user=await User.findOne({email})
        if(user){
         
           throw new UserInputError("email name is taken ")
        errors:{
           username:'This email is taken'
        }

    }
     console.log(errors)
      var hashpass = await bcrypt.hash(password,12);
           
        const newUser=new User({ 
          id,
          name,
          email,
          password:hashpass  
        });
        const res =await newUser.save();
        const token = genarateToken(res); 
        return({
                 id:res.id,
                 token
               });
   }
  }//muend
}


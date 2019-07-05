
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema,GraphQLError } = require('graphql');
////////////
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const {validateRegisterInput,validateLoginInput,validateStaffInput}=require('./util/validators')
const {SECRET_KEY}=require("./config");
///////
const Staff=require('./model/Staff')
const User=require('./model/User')

var schema = buildSchema(`
type Staff{
  id:ID!
  name:String!
  address:String!
  nic:String!
  tel:String!
}

input RegisterInput {
    id:ID!
    name:String!
    email:String!
    password:String!
    confirmPassword:String!
  }  
  input StaffInput {
    id:ID!
    name:String!
    address:String!
    nic:String!
    tel:String!
  }  
  type User {
    id: ID!    
    email:String!
    token:String!
    name:String!
  }

  type Query {
    getStaffs:[Staff]
    getStaff(id: ID!):Staff
    getUser(id: ID!): User
    getUsers:[User]
  }

  type Mutation {
    createStaff(input: StaffInput): Staff
    updateStaff(id:ID!,input:StaffInput):Staff!
    DeleteStaff(staffid:ID!):String!
    createUser(input: RegisterInput): User
    login(email:String!,password:String!): User!
    updateUser(id: ID!, input: RegisterInput): User!
  }
  
`);

//Genarate token function
function genarateToken(user){
  return jwt.sign({
      id:user.id,
      email:user.email,
      name:user.name  

  },SECRET_KEY,{expiresIn:'1h'});
 
};

//resolver for register user and loging 
var root = { 

  //register Start
  async createUser({input:{id,name,email,password,confirmPassword}}) {

             //Validate user data
        const {valid ,errors}=validateRegisterInput(name,email,password,confirmPassword)
               if (!valid) {
                
           throw new GraphQLError(errors);
        }
       
        //make sure user doesnt exist
        const user=await User.findOne({where:{email:email}});
       if(user){
           throw new GraphQLError("email name is taken ")
        errors:{
           email:'This email is taken'
        }

    }
    
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
  },
  //register End
    
  //Login Start 
  async login({email,password}){
    const {valid ,errors}=validateLoginInput(email,password);
    const user=await User.findOne({where:{email:email}});
    if(!valid){
      console.log(errors);
        throw new GraphQLError(errors);
    }
    if(!user){
        errors.genaral="User not found";
        console.log(errors);
        throw new GraphQLError("User not found",errors);
        
    }
    const match =await bcrypt.compare(password,user.password);
    if(!match){
           
        errors.genaral="Wrong crednitials";
        console.log(errors);
        throw new GraphQLError("Wrong crednitials",errors);
        
    }
    const token = genarateToken(user);
    return({
          
        id:user.id,
        email:user.email,
        token
});
},
  //Login End 

  //Get ALL Staff Details start
async getStaffs(){
  try {
    const staff=  await Staff.findAll();
    return staff;
  } catch (err) {
    throw new Error(err)
  }
},
 //Get ALL Staff Details END

  //Get Staff Details start
async getStaff({id}){
  try {
     const staff =await Staff.findByPk(id);
     if (staff) {
       return staff;
     }else{
       throw new ('Staff Not found')
     }
  } catch (err) {
    throw new Error(err)
  }
},
  //Get Staff Details END

  //Create Staff START
async createStaff({input:{id,name,address,nic,tel}}){

  //validate crete staff input not done 
     //Validate user data
    // const {valid ,errors}=validateStaffInput(name,address,nic,tel)
    // if (!valid) {
      
 //throw new GraphQLError(errors);
//}

  //check staff alredy exit or not within id
   const staff = await Staff.findOne({where:{nic:nic}});

   if(staff) {
    throw new GraphQLError("Staff Alredy inserted  inthis NIC No");
   }
   const newStaff=new Staff({
     id,
     name,
     address,
     nic,
     tel
   });
   const res=await newStaff.save();
   return({
     name:res.name
   });

},
  //Create Staff END
 //Update Staff START

async updateStaff({input:{id,name,address,nic,tel}}){
  //const staff = await Staff.findOne({where:{id:id}});
 
  const up = await Staff.update({ name: name,address:address ,nic:nic ,tel:tel },{ where: { id: id } });
 if (up) {
   console.log("update sucess")
 }


},
 //Update Staff END

 //Delete  Staff START
 async DeleteStaff({id}){
    await Staff.destroy({where:{id:id}})
    return 'delete Succesfuly';
 
 }
 //Delete Staff END
  
};


var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue:root,
    graphiql: true,
    
 
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:5000/graphql');
});
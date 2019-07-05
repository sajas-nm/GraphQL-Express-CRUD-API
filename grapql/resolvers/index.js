//const postsResolvers=require('../resolvers/posts')
const usersResolvers=require('../resolvers/users')
 module.exports={
  
    Mutation:{
        ...usersResolvers.Mutation
       
    }

 }
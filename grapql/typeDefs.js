var { buildSchema} = require('graphql');
const schema=buildSchema(`
input RegisterInput {
  id:ID!
  name:String!
  email:String!
  password:String!
  confirmPassword:String!
}
type User {
  id: ID!    
  email:String!
  token:String!
  name:String!
}

type Query {
  getUsers:[User]
  getUser(id: ID!): User
}

type Mutation {
  createUser(input: RegisterInput): User
  Login(email:String!,password:String!): User!
  updateUser(id: ID!, input: RegisterInput): User!
}

`)
module.exports=schema
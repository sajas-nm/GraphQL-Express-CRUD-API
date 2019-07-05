const Sequelize =require("sequelize");
const db={}
const sequelize=new Sequelize("myapp2","user","password",{
    host:'192.168.1.7',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
db.Sequelize=Sequelize
db.sequelize=sequelize
module.exports=db
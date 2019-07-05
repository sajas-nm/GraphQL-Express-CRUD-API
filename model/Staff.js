const Sequelize=require('sequelize')
 const db=require('../database/db')
 module.exports=db.sequelize.define(
     'staffs',
     {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING
        },
        address:{
            type:Sequelize.STRING
        },
        nic:{
            type:Sequelize.STRING
        },
        tel:{
            type:Sequelize.STRING,
            unique: true
        },
     },
     {
         timestamps:false
     }
     
 );
    
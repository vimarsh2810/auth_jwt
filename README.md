# Authentication using JWT

* Database Schema
  'users' table:

  id: {  
    &emsp;type: int,  
    &emsp;autoIncrement: true,  
    &emsp;allowNull: false,  
    &emsp;primaryKey: true  
  },  
  name: {  
    &emsp;type: varchar(25),  
    &emsp;allowNull: false,  
  },  
  email: {  
    &emsp;type: varchar(45),  
    &emsp;allowNull: false,  
    &emsp;unique: true  
  },  
  username: {  
    &emsp;type: varchar(25),  
    &emsp;allowNull: false,  
    &emsp;unique: true  
  },  
  password: {  
    &emsp;type: varchar(100),  
    &emsp;allowNull: false  
  }  
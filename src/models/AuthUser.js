import variables from "../variables";
import bcrypt from 'bcryptjs'; 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    deliveryAddress: {
      type: String,
      required: true
    }, 
    orderLog: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order"
    }]
  },
  {
    timestamps: true
  },
);

const UserModel = mongoose.model('User', userSchema);



async function create(inputs) {
  const { password, ...otherParams } = inputs;
  // const now = new Date().toISOString();
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(variables.saltRounds, 10)
  );

  const {_id, email, name, deliveryAddress} =await  new UserModel({
    ...otherParams,
    password: hashedPassword,
  }).save();
  
  return {
    _id, 
    email, 
    name, 
    deliveryAddress
  };
}

async function update(email = "", data = {}) {
  const {
    _id,  name, deliveryAddress
  } = await UserModel.findOneAndUpdate({email}, {...data})
  return {
    _id, 
    email, 
    name, 
    deliveryAddress
  };
}

async function remove(email=""){
  const {
    _id, 
    name 
  } = await UserModel.findOneAndDelete({email}); 
  return {
    _id, 
    email, 
    name
  }; 
}
async function getByEmail(email = "") {
  const user =  await  UserModel.findOne({ email }); 
  return user;
}

export { create, getByEmail, update, remove };
